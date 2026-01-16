import { useState, useCallback } from 'react';
import { aiProfileApi, ExtractedProfileData } from '@/lib/api/ai-profile';
import { Locale } from '@/types/exhibitor';

export type ExtractionStatus = 
  | 'idle' 
  | 'scraping' 
  | 'extracting' 
  | 'complete' 
  | 'error';

export interface ExtractionProgress {
  status: ExtractionStatus;
  message: string;
  percentage: number;
}

export interface UseAIProfileExtractionReturn {
  startExtraction: (websiteUrl: string) => Promise<ExtractedProfileData | null>;
  extractedData: ExtractedProfileData | null;
  progress: ExtractionProgress;
  error: string | null;
  reset: () => void;
}

export function useAIProfileExtraction(
  primaryLocale: Locale = 'en-GB',
  secondaryLocales: Locale[] = ['fr-FR', 'ja-JP']
): UseAIProfileExtractionReturn {
  const [extractedData, setExtractedData] = useState<ExtractedProfileData | null>(null);
  const [progress, setProgress] = useState<ExtractionProgress>({
    status: 'idle',
    message: '',
    percentage: 0
  });
  const [error, setError] = useState<string | null>(null);

  const startExtraction = useCallback(async (websiteUrl: string): Promise<ExtractedProfileData | null> => {
    setError(null);
    setExtractedData(null);

    // Step 1: Scraping
    setProgress({
      status: 'scraping',
      message: 'Scraping website content...',
      percentage: 20
    });

    await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for UI

    setProgress({
      status: 'extracting',
      message: 'Extracting company information...',
      percentage: 50
    });

    const result = await aiProfileApi.scrapeCompanyProfile(
      websiteUrl,
      primaryLocale,
      secondaryLocales
    );

    if (!result.success || !result.data) {
      setProgress({
        status: 'error',
        message: result.error || 'Failed to extract profile',
        percentage: 0
      });
      setError(result.error || 'Failed to extract profile');
      return null;
    }

    setProgress({
      status: 'complete',
      message: 'Extraction complete!',
      percentage: 100
    });

    setExtractedData(result.data);
    return result.data;
  }, [primaryLocale, secondaryLocales]);

  const reset = useCallback(() => {
    setExtractedData(null);
    setProgress({
      status: 'idle',
      message: '',
      percentage: 0
    });
    setError(null);
  }, []);

  return {
    startExtraction,
    extractedData,
    progress,
    error,
    reset
  };
}
