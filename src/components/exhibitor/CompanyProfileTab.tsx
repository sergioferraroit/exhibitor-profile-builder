import { useState } from 'react';
import { ProfileSection, Locale, SectionId, SECTION_IDS, ExhibitorProfile } from '@/types/exhibitor';
import { SectionCard } from './SectionCard';
import { CompanyProfileWYSIWYG } from './CompanyProfileWYSIWYG';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, Eye } from 'lucide-react';

type ViewMode = 'wysiwyg' | 'cards';

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
  sections,
  selectedLocale,
  packageType,
  onEditSection,
  onToggleNotRelevant,
  onNavigateToProducts,
  hasProducts,
}: CompanyProfileTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('wysiwyg');

  // Filter out sponsored category for non-gold packages
  const filteredSections = sections.filter(section => {
    if (section.id === SECTION_IDS.SPONSORED_CATEGORY && packageType !== 'gold') {
      return false;
    }
    return true;
  });

  const groupASections = filteredSections.filter(s => s.group === 'A');
  const groupBSections = filteredSections.filter(s => s.group === 'B');

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Choose your preferred editing view
        </p>
        <ToggleGroup 
          type="single" 
          value={viewMode} 
          onValueChange={(value) => value && setViewMode(value as ViewMode)}
          className="bg-muted p-1 rounded-lg"
        >
          <ToggleGroupItem 
            value="wysiwyg" 
            aria-label="Preview view"
            className="gap-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="cards" 
            aria-label="Card view"
            className="gap-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === 'wysiwyg' ? (
        <CompanyProfileWYSIWYG
          profile={profile}
          selectedLocale={selectedLocale}
          onEditSection={onEditSection}
          onNavigateToProducts={onNavigateToProducts}
        />
      ) : (
        <div className="space-y-8">
          {/* Group A - High Impact Sections */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-foreground">High Impact Sections</h2>
              <span className="px-2 py-0.5 text-xs font-medium bg-high-impact text-high-impact-foreground rounded-full">
                80% weight
              </span>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              These sections appear on the exhibitor directory and receive the most visitor engagement.
            </p>
            <div className="grid gap-gutter grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {groupASections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  selectedLocale={selectedLocale}
                  isHighImpact
                  onEdit={() => {
                    if (section.id === SECTION_IDS.PRODUCTS) {
                      onNavigateToProducts();
                    } else {
                      onEditSection(section.id);
                    }
                  }}
                  onToggleNotRelevant={() => onToggleNotRelevant(section.id)}
                  customStatus={section.id === SECTION_IDS.PRODUCTS ? (hasProducts ? 'complete' : 'empty') : undefined}
                />
              ))}
            </div>
          </section>

          {/* Group B - Additional Sections */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-foreground">Additional Sections</h2>
              <span className="px-2 py-0.5 text-xs font-medium bg-muted text-foreground-secondary rounded-full">
                20% weight
              </span>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              These sections appear on your exhibitor details page.
            </p>
            <div className="grid gap-gutter grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {groupBSections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  selectedLocale={selectedLocale}
                  isHighImpact={false}
                  onEdit={() => onEditSection(section.id)}
                  onToggleNotRelevant={() => onToggleNotRelevant(section.id)}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
