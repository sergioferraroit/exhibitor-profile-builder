import { useState, useCallback } from 'react';
import { Locale } from '@/types/exhibitor';
import { aiProfileApi, ExtractedProfileData } from '@/lib/api/ai-profile';

export type AIFieldId = 
  | 'description'
  | 'why-visit'
  | 'logo'
  | 'cover-image'
  | 'social-media'
  | 'filters'
  | 'matchmaking'
  | 'products';

interface AIFieldState {
  hasAIContent: boolean;
  previousValue: string | string[] | null;
  aiValue: string | string[] | null;
}

interface UseWizardAIReturn {
  // Website URL state
  websiteUrl: string | null;
  setWebsiteUrl: (url: string) => void;
  hasExtractedData: boolean;
  
  // Extraction
  extractedData: ExtractedProfileData | null;
  isExtracting: boolean;
  extractionError: string | null;
  startExtraction: (url: string) => Promise<boolean>;
  
  // Field AI states
  fieldStates: Record<string, AIFieldState>;
  applyAIContent: (fieldId: AIFieldId, currentValue: string | string[] | null) => string | string[] | null;
  undoAIContent: (fieldId: AIFieldId) => string | string[] | null;
  hasAIContent: (fieldId: AIFieldId) => boolean;
  
  // Reset
  reset: () => void;
}

export function useWizardAI(
  primaryLocale: Locale = 'en-GB',
  secondaryLocales: Locale[] = ['fr-FR', 'ja-JP']
): UseWizardAIReturn {
  const [websiteUrl, setWebsiteUrl] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedProfileData | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [fieldStates, setFieldStates] = useState<Record<string, AIFieldState>>({});

  const startExtraction = useCallback(async (url: string): Promise<boolean> => {
    setIsExtracting(true);
    setExtractionError(null);
    setWebsiteUrl(url);

    const result = await aiProfileApi.scrapeCompanyProfile(url, primaryLocale, secondaryLocales);

    setIsExtracting(false);

    if (result.success && result.data) {
      setExtractedData(result.data);
      return true;
    } else {
      setExtractionError(result.error || 'Failed to extract data');
      return false;
    }
  }, [primaryLocale, secondaryLocales]);

  const getAIValueForField = useCallback((fieldId: AIFieldId, locale: Locale): string | string[] | null => {
    if (!extractedData) return null;

    switch (fieldId) {
      case 'description':
        return extractedData.companyDescription?.[locale] || null;
      case 'why-visit':
        return extractedData.whyVisit?.[locale] || null;
      case 'logo':
        return extractedData.logo || null;
      case 'cover-image':
        return extractedData.coverImage || null;
      case 'social-media':
        if (!extractedData.socialMedia) return null;
        const socialLinks = Object.entries(extractedData.socialMedia)
          .filter(([_, url]) => url)
          .map(([platform, url]) => `${platform}: ${url}`)
          .join('\n');
        return socialLinks || null;
      case 'filters':
        return extractedData.filterTags?.join(', ') || null;
      case 'matchmaking':
        return extractedData.matchmakingTags?.join(', ') || null;
      case 'products':
        // Products are handled separately
        return null;
      default:
        return null;
    }
  }, [extractedData]);

  const applyAIContent = useCallback((fieldId: AIFieldId, currentValue: string | string[] | null): string | string[] | null => {
    const aiValue = getAIValueForField(fieldId, primaryLocale);
    
    if (!aiValue) return currentValue;

    setFieldStates(prev => ({
      ...prev,
      [fieldId]: {
        hasAIContent: true,
        previousValue: currentValue,
        aiValue,
      }
    }));

    return aiValue;
  }, [getAIValueForField, primaryLocale]);

  const undoAIContent = useCallback((fieldId: AIFieldId): string | string[] | null => {
    const state = fieldStates[fieldId];
    
    if (!state || !state.hasAIContent) return null;

    const previousValue = state.previousValue;

    setFieldStates(prev => ({
      ...prev,
      [fieldId]: {
        hasAIContent: false,
        previousValue: null,
        aiValue: null,
      }
    }));

    return previousValue;
  }, [fieldStates]);

  const hasAIContent = useCallback((fieldId: AIFieldId): boolean => {
    return fieldStates[fieldId]?.hasAIContent || false;
  }, [fieldStates]);

  const reset = useCallback(() => {
    setWebsiteUrl(null);
    setExtractedData(null);
    setIsExtracting(false);
    setExtractionError(null);
    setFieldStates({});
  }, []);

  return {
    websiteUrl,
    setWebsiteUrl,
    hasExtractedData: !!extractedData,
    extractedData,
    isExtracting,
    extractionError,
    startExtraction,
    fieldStates,
    applyAIContent,
    undoAIContent,
    hasAIContent,
    reset,
  };
}
