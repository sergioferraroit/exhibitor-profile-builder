import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExtractedProfile {
  companyDescription: Record<string, string>;
  whyVisit: Record<string, string>;
  logo: string | null;
  coverImage: string | null;
  socialMedia: {
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
  };
  products: Array<{
    name: Record<string, string>;
    description: Record<string, string>;
  }>;
  filterTags: string[];
  matchmakingTags: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { websiteUrl, primaryLocale = 'en-GB', secondaryLocales = ['fr-FR', 'ja-JP'] } = await req.json();

    if (!websiteUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Website URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format URL
    let formattedUrl = websiteUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Scraping URL:', formattedUrl);

    // Step 1: Scrape with Firecrawl
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown', 'links'],
        onlyMainContent: true,
      }),
    });

    if (!firecrawlResponse.ok) {
      const errorData = await firecrawlResponse.text();
      console.error('Firecrawl error:', errorData);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to scrape website' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const scrapeData = await firecrawlResponse.json();
    const markdown = scrapeData.data?.markdown || scrapeData.markdown || '';
    const links = scrapeData.data?.links || scrapeData.links || [];
    const metadata = scrapeData.data?.metadata || scrapeData.metadata || {};

    console.log('Scrape successful, content length:', markdown.length);

    // Step 2: Try to get branding separately
    let brandingData = null;
    try {
      const brandingResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formattedUrl,
          formats: ['branding'],
        }),
      });

      if (brandingResponse.ok) {
        const brandingResult = await brandingResponse.json();
        brandingData = brandingResult.data?.branding || brandingResult.branding;
        console.log('Branding extracted:', brandingData ? 'yes' : 'no');
      }
    } catch (e) {
      console.log('Branding extraction failed, continuing without it');
    }

    // Step 3: Use Lovable AI to extract structured data
    const allLocales = [primaryLocale, ...secondaryLocales];
    const localeNames: Record<string, string> = {
      'en-GB': 'English (UK)',
      'fr-FR': 'French',
      'ja-JP': 'Japanese'
    };

    const systemPrompt = `You are an expert at extracting company information from website content. 
Extract structured data and provide translations for all requested languages.
Be concise but informative. Focus on professional, marketing-quality content.`;

    const userPrompt = `Analyze this company website content and extract the following information.
Provide translations for these languages: ${allLocales.map(l => localeNames[l]).join(', ')}

Website Content:
${markdown.slice(0, 15000)}

Links found on page:
${links.slice(0, 50).join('\n')}

${brandingData ? `Branding info: Logo URL: ${brandingData.logo || brandingData.images?.logo || 'not found'}` : ''}

Extract and return using the extract_profile function.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'extract_profile',
              description: 'Extract company profile data with translations',
              parameters: {
                type: 'object',
                properties: {
                  companyDescription: {
                    type: 'object',
                    description: 'Company description in each locale (2-3 paragraphs, professional marketing tone)',
                    properties: allLocales.reduce((acc, locale) => ({ ...acc, [locale]: { type: 'string' } }), {}),
                    required: allLocales
                  },
                  whyVisit: {
                    type: 'object',
                    description: 'Why visit our stand - compelling reasons to visit (2-3 sentences)',
                    properties: allLocales.reduce((acc, locale) => ({ ...acc, [locale]: { type: 'string' } }), {}),
                    required: allLocales
                  },
                  logo: {
                    type: 'string',
                    description: 'URL to company logo if found, or null',
                    nullable: true
                  },
                  coverImage: {
                    type: 'string', 
                    description: 'URL to a hero/banner image suitable for cover, or null',
                    nullable: true
                  },
                  socialMedia: {
                    type: 'object',
                    properties: {
                      linkedin: { type: 'string', nullable: true },
                      twitter: { type: 'string', nullable: true },
                      facebook: { type: 'string', nullable: true },
                      instagram: { type: 'string', nullable: true }
                    }
                  },
                  products: {
                    type: 'array',
                    description: 'Up to 5 main products/services',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'object',
                          properties: allLocales.reduce((acc, locale) => ({ ...acc, [locale]: { type: 'string' } }), {})
                        },
                        description: {
                          type: 'object',
                          properties: allLocales.reduce((acc, locale) => ({ ...acc, [locale]: { type: 'string' } }), {})
                        }
                      }
                    }
                  },
                  filterTags: {
                    type: 'array',
                    description: 'Industry/category tags (max 5)',
                    items: { type: 'string' }
                  },
                  matchmakingTags: {
                    type: 'array',
                    description: 'Business intent tags like "Looking for Distributors" (max 5)',
                    items: { type: 'string' }
                  }
                },
                required: ['companyDescription', 'whyVisit', 'socialMedia', 'products', 'filterTags', 'matchmakingTags']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'extract_profile' } }
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'AI service quota exceeded.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI extraction error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to extract profile data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResult = await aiResponse.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      console.error('No tool call in AI response');
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse extracted data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let extractedData: ExtractedProfile;
    try {
      extractedData = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse extracted data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use branding data for logo if available and not found by AI
    if (!extractedData.logo && brandingData?.logo) {
      extractedData.logo = brandingData.logo;
    }
    if (!extractedData.logo && brandingData?.images?.logo) {
      extractedData.logo = brandingData.images.logo;
    }

    // Use OG image as cover if not found
    if (!extractedData.coverImage && metadata?.ogImage) {
      extractedData.coverImage = metadata.ogImage;
    }

    console.log('Profile extraction complete');

    return new Response(
      JSON.stringify({
        success: true,
        data: extractedData,
        metadata: {
          sourceUrl: formattedUrl,
          scrapedAt: new Date().toISOString(),
          contentLength: markdown.length,
          linksFound: links.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in scrape-company-profile:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
