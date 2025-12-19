import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useExhibitorProfile } from '@/hooks/useExhibitorProfile';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileHeader } from '@/components/exhibitor/ProfileHeader';
import { CompanyProfileTab } from '@/components/exhibitor/CompanyProfileTab';
import { ProductListingTab } from '@/components/exhibitor/ProductListingTab';
import { SectionEditModal } from '@/components/exhibitor/SectionEditModal';
import { WizardModal } from '@/components/exhibitor/WizardModal';
import { Locale, SectionId } from '@/types/exhibitor';

const ExhibitorHub = () => {
  const {
    profile,
    selectedLocale,
    setSelectedLocale,
    updateSection,
    toggleNotRelevant,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    getWizardSteps,
  } = useExhibitorProfile();

  const completion = useProfileCompletion(profile);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'products'>('profile');
  const [editingSectionId, setEditingSectionId] = useState<SectionId | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const editingSection = editingSectionId 
    ? profile.sections.find(s => s.id === editingSectionId) 
    : null;

  const wizardSteps = getWizardSteps();

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader
        companyName={profile.companyName}
        completionPercentage={completion.overallPercentage}
        selectedLocale={selectedLocale}
        onLocaleChange={setSelectedLocale}
        onOpenWizard={() => setIsWizardOpen(true)}
        availableLocales={[profile.primaryLocale, ...profile.secondaryLocales]}
        primaryLocale={profile.primaryLocale}
      />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'profile' | 'products')}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="products">Product Listing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <CompanyProfileTab
              sections={profile.sections}
              selectedLocale={selectedLocale}
              packageType={profile.packageType}
              onEditSection={(sectionId) => setEditingSectionId(sectionId as SectionId)}
              onToggleNotRelevant={toggleNotRelevant}
              onNavigateToProducts={() => setActiveTab('products')}
              hasProducts={profile.products.length > 0}
            />
          </TabsContent>

          <TabsContent value="products">
            <ProductListingTab
              products={profile.products}
              selectedLocale={selectedLocale}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
              onReorderProducts={reorderProducts}
              onToggleNotRelevant={() => {
                const productsSection = profile.sections.find(s => s.id === 'products');
                if (productsSection) toggleNotRelevant(productsSection.id);
              }}
              isNotRelevant={profile.sections.find(s => s.id === 'products')?.isNotRelevant ?? false}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Section Edit Modal */}
      {editingSection && (
        <SectionEditModal
          isOpen={!!editingSectionId}
          onClose={() => setEditingSectionId(null)}
          section={editingSection}
          selectedLocale={selectedLocale}
          onLocaleChange={setSelectedLocale}
          availableLocales={[profile.primaryLocale, ...profile.secondaryLocales]}
          primaryLocale={profile.primaryLocale}
          completionPercentage={completion.overallPercentage}
          onSave={(value, status) => {
            updateSection(editingSection.id, selectedLocale, value, status);
            setEditingSectionId(null);
          }}
        />
      )}

      {/* Wizard Modal */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        steps={wizardSteps}
        sections={profile.sections}
        selectedLocale={selectedLocale}
        onLocaleChange={setSelectedLocale}
        availableLocales={[profile.primaryLocale, ...profile.secondaryLocales]}
        primaryLocale={profile.primaryLocale}
        completionPercentage={completion.overallPercentage}
        onUpdateSection={updateSection}
        onSkipSection={toggleNotRelevant}
        hasProducts={profile.products.length > 0}
        onNavigateToProducts={() => {
          setIsWizardOpen(false);
          setActiveTab('products');
        }}
      />
    </div>
  );
};

export default ExhibitorHub;
