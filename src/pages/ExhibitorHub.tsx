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
import { PublicProfilePreview } from '@/components/exhibitor/PublicProfilePreview';
import { AIFloatingTrigger } from '@/components/exhibitor/AIFloatingTrigger';
import { AIOnboardingModal } from '@/components/exhibitor/AIOnboardingModal';
import { Locale, SectionId } from '@/types/exhibitor';
import { toast } from 'sonner';

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
    updateCompanyName,
  } = useExhibitorProfile();

  const completion = useProfileCompletion(profile);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'products'>('profile');
  const [editingSectionId, setEditingSectionId] = useState<SectionId | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAIOnboardingOpen, setIsAIOnboardingOpen] = useState(false);
  const [hasSeenAIOnboarding, setHasSeenAIOnboarding] = useState(false);

  const handleAITriggerClick = () => {
    if (!hasSeenAIOnboarding) {
      setIsAIOnboardingOpen(true);
    } else {
      // Future: open AI assistant panel
      toast.info('AI Assistant is ready to help!');
    }
  };

  const handleAIStart = (url: string) => {
    setHasSeenAIOnboarding(true);
    setIsAIOnboardingOpen(false);
    toast.success(`Starting AI profile generation from: ${url}`);
    // Future: trigger AI scraping logic
  };

  const handleAISkip = () => {
    setHasSeenAIOnboarding(true);
  };

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
        onOpenPreview={() => setIsPreviewOpen(true)}
        onUpdateCompanyName={updateCompanyName}
        availableLocales={[profile.primaryLocale, ...profile.secondaryLocales]}
        primaryLocale={profile.primaryLocale}
      />

      <main className="container mx-auto py-6">
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

      {/* Public Profile Preview */}
      <PublicProfilePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        profile={profile}
        selectedLocale={selectedLocale}
      />
      {/* AI Floating Trigger */}
      <AIFloatingTrigger onClick={handleAITriggerClick} />

      {/* AI Onboarding Modal */}
      <AIOnboardingModal
        isOpen={isAIOnboardingOpen}
        onClose={() => setIsAIOnboardingOpen(false)}
        onStart={handleAIStart}
        onSkip={handleAISkip}
      />
    </div>
  );
};

export default ExhibitorHub;
