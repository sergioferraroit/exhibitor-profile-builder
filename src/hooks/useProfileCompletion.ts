import { useMemo } from 'react';
import { ExhibitorProfile, ProfileSection, Locale, SectionGroup } from '@/types/exhibitor';

interface CompletionResult {
  overallPercentage: number;
  primaryLocalePercentage: number;
  secondaryLocalesPercentage: Record<Locale, number>;
  groupAPercentage: number;
  groupBPercentage: number;
  hasProducts: boolean;
}

const GROUP_A_WEIGHT = 0.8;
const GROUP_B_WEIGHT = 0.2;
const PRIMARY_LOCALE_WEIGHT = 0.9;
const SECONDARY_LOCALES_WEIGHT = 0.1;

export function useProfileCompletion(profile: ExhibitorProfile): CompletionResult {
  return useMemo(() => {
    const relevantSections = profile.sections.filter(s => !s.isNotRelevant);
    
    const groupASections = relevantSections.filter(s => s.group === 'A');
    const groupBSections = relevantSections.filter(s => s.group === 'B');
    
    const hasProducts = profile.products.length > 0;
    const hasSecondaryLocales = profile.secondaryLocales.length > 0;
    
    // Calculate Group A completion for primary locale
    const groupAComplete = groupASections.filter(s => {
      // Products section is complete if at least one product exists
      if (s.id === 'products') return hasProducts;
      return s.localeData[profile.primaryLocale]?.status === 'complete';
    }).length;
    const groupATotal = groupASections.length || 1;
    const groupAPercentage = (groupAComplete / groupATotal) * 100;
    
    // Calculate Group B completion for primary locale
    const groupBComplete = groupBSections.filter(s => 
      s.localeData[profile.primaryLocale]?.status === 'complete'
    ).length;
    const groupBTotal = groupBSections.length || 1;
    const groupBPercentage = (groupBComplete / groupBTotal) * 100;
    
    // Primary locale weighted score
    const primaryLocaleScore = (groupAPercentage * GROUP_A_WEIGHT) + (groupBPercentage * GROUP_B_WEIGHT);
    
    // Calculate secondary locale scores
    const secondaryLocalesPercentage: Record<Locale, number> = {} as Record<Locale, number>;
    let totalSecondaryScore = 0;
    
    if (hasSecondaryLocales) {
      const weightPerLocale = SECONDARY_LOCALES_WEIGHT / profile.secondaryLocales.length;
      
      profile.secondaryLocales.forEach(locale => {
        const localeGroupAComplete = groupASections.filter(s => {
          if (s.id === 'products') return hasProducts;
          return s.localeData[locale]?.status === 'complete';
        }).length;
        const localeGroupBComplete = groupBSections.filter(s => 
          s.localeData[locale]?.status === 'complete'
        ).length;
        
        const localeGroupAPercentage = (localeGroupAComplete / groupATotal) * 100;
        const localeGroupBPercentage = (localeGroupBComplete / groupBTotal) * 100;
        const localeScore = (localeGroupAPercentage * GROUP_A_WEIGHT) + (localeGroupBPercentage * GROUP_B_WEIGHT);
        
        secondaryLocalesPercentage[locale] = localeScore;
        totalSecondaryScore += localeScore * weightPerLocale;
      });
    }
    
    // Final calculation
    const primaryWeight = hasSecondaryLocales ? PRIMARY_LOCALE_WEIGHT : 1;
    const overallPercentage = hasSecondaryLocales
      ? (primaryLocaleScore * primaryWeight) + totalSecondaryScore
      : primaryLocaleScore;
    
    return {
      overallPercentage: Math.round(overallPercentage),
      primaryLocalePercentage: Math.round(primaryLocaleScore),
      secondaryLocalesPercentage,
      groupAPercentage: Math.round(groupAPercentage),
      groupBPercentage: Math.round(groupBPercentage),
      hasProducts,
    };
  }, [profile]);
}
