import { ProfileSection, Locale, ExhibitorProfile } from '@/types/exhibitor';
import { CompanyProfileWYSIWYG } from './CompanyProfileWYSIWYG';

interface CompanyProfileTabProps {
  profile: ExhibitorProfile;
  sections: ProfileSection[];
  selectedLocale: Locale;
  packageType: 'bronze' | 'silver' | 'gold';
  onEditSection: (sectionId: string) => void;
  onToggleNotRelevant: (sectionId: string) => void;
  onNavigateToProducts: () => void;
  hasProducts: boolean;
}

export function CompanyProfileTab({
  profile,
  selectedLocale,
  onEditSection,
  onNavigateToProducts,
}: CompanyProfileTabProps) {
  return (
    <CompanyProfileWYSIWYG
      profile={profile}
      selectedLocale={selectedLocale}
      onEditSection={onEditSection}
      onNavigateToProducts={onNavigateToProducts}
    />
  );
}
