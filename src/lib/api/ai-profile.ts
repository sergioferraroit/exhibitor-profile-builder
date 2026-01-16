import { supabase } from '@/integrations/supabase/client';
import { Locale } from '@/types/exhibitor';

export interface ExtractedProfileData {
  companyDescription: Record<Locale, string>;
  whyVisit: Record<Locale, string>;
  logo: string | null;
  coverImage: string | null;
  socialMedia: {
    linkedin: string | null;
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
  };
  products: Array<{
    name: Record<Locale, string>;
    description: Record<Locale, string>;
  }>;
  filterTags: string[];
  matchmakingTags: string[];
}

export interface ScrapeResponse {
  success: boolean;
  data?: ExtractedProfileData;
  metadata?: {
    sourceUrl: string;
    scrapedAt: string;
    contentLength: number;
    linksFound: number;
  };
  error?: string;
}

export interface TranslateResponse {
  success: boolean;
  translatedText?: string;
  error?: string;
}

export const aiProfileApi = {
  /**
   * Scrape a company website and extract profile data
   */
  async scrapeCompanyProfile(
    websiteUrl: string,
    primaryLocale: Locale = 'en-GB',
    secondaryLocales: Locale[] = ['fr-FR', 'ja-JP']
  ): Promise<ScrapeResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('scrape-company-profile', {
        body: { websiteUrl, primaryLocale, secondaryLocales },
      });

      if (error) {
        console.error('Scrape error:', error);
        return { success: false, error: error.message };
      }

      return data as ScrapeResponse;
    } catch (err) {
      console.error('Scrape exception:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to scrape website' 
      };
    }
  },

  /**
   * Translate content from one locale to another
   */
  async translateContent(
    text: string,
    sourceLocale: Locale,
    targetLocale: Locale,
    context?: string
  ): Promise<TranslateResponse> {
    if (sourceLocale === targetLocale) {
      return { success: true, translatedText: text };
    }

    try {
      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: { text, sourceLocale, targetLocale, context },
      });

      if (error) {
        console.error('Translation error:', error);
        return { success: false, error: error.message };
      }

      return data as TranslateResponse;
    } catch (err) {
      console.error('Translation exception:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Translation failed' 
      };
    }
  },

  /**
   * Translate content to multiple locales at once
   */
  async translateToLocales(
    text: string,
    sourceLocale: Locale,
    targetLocales: Locale[],
    context?: string
  ): Promise<Record<Locale, string>> {
    const translations: Record<string, string> = {
      [sourceLocale]: text
    };

    const translatePromises = targetLocales
      .filter(locale => locale !== sourceLocale)
      .map(async (locale) => {
        const result = await this.translateContent(text, sourceLocale, locale, context);
        return { locale, text: result.success ? result.translatedText! : text };
      });

    const results = await Promise.all(translatePromises);
    results.forEach(({ locale, text }) => {
      translations[locale] = text;
    });

    return translations as Record<Locale, string>;
  }
};
