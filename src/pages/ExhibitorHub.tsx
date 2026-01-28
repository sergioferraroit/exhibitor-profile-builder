import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyProfileIcon from "@/assets/company-profile-icon.svg";
import ProductListingIcon from "@/assets/product-listing-icon.svg";
import { useExhibitorProfile } from "@/hooks/useExhibitorProfile";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { TopBar } from "@/components/exhibitor/TopBar";
import { MainNav } from "@/components/exhibitor/MainNav";
import { ProfileHeader } from "@/components/exhibitor/ProfileHeader";
import { CompanyProfileTab } from "@/components/exhibitor/CompanyProfileTab";
import { ProductListingTab } from "@/components/exhibitor/ProductListingTab";
import { SectionEditModal } from "@/components/exhibitor/SectionEditModal";
import { WizardModal } from "@/components/exhibitor/WizardModal";
import { PublicProfilePreview } from "@/components/exhibitor/PublicProfilePreview";
import { Locale, SectionId } from "@/types/exhibitor";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ExhibitorHub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

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

  // Calculate section fulfillment counts
  const relevantSections = profile.sections.filter(s => !s.isNotRelevant);
  const fulfilledSections = relevantSections.filter(s => {
    if (s.id === 'products') return profile.products.length > 0;
    return s.localeData[profile.primaryLocale]?.status === 'complete';
  }).length;
  const totalSections = relevantSections.length;

  // Derive active tab from URL
  const activeTab = location.pathname === "/product-listing" ? "products" : "profile";

  const handleTabChange = (value: string) => {
    if (value === "products") {
      navigate("/product-listing");
    } else {
      navigate("/edit-company-profile");
    }
  };

  const [editingSectionId, setEditingSectionId] = useState<SectionId | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Top bar state
  const [eventEdition, setEventEdition] = useState("2025");

  const editingSection = editingSectionId ? profile.sections.find((s) => s.id === editingSectionId) : null;

  const wizardSteps = getWizardSteps();

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        eventName="The London Book Fair"
        eventDates="10-12 March 2026"
        eventLocation="Olympia London"
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />

      <MainNav />

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
        fulfilledSections={fulfilledSections}
        totalSections={totalSections}
      />

      <main className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6 bg-transparent p-0.5 rounded-full border border-border inline-flex gap-0">
            <TabsTrigger
              value="profile"
              className="px-3 py-1.5 text-sm font-medium rounded-full transition-all gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted"
            >
              {activeTab === "profile" && (
                <img src={CompanyProfileIcon} alt="" className="w-[17px] h-[18px]" />
              )}
              {t("exhibitor.companyProfile")}
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="px-3 py-1.5 text-sm font-medium rounded-full transition-all gap-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted"
            >
              {activeTab === "products" && (
                <img src={ProductListingIcon} alt="" className="w-[19px] h-[15px]" />
              )}
              {t("exhibitor.productListing")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <CompanyProfileTab
              profile={profile}
              sections={profile.sections}
              selectedLocale={selectedLocale}
              packageType={profile.packageType}
              onEditSection={(sectionId) => setEditingSectionId(sectionId as SectionId)}
              onToggleNotRelevant={toggleNotRelevant}
              onNavigateToProducts={() => navigate("/product-listing")}
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
                const productsSection = profile.sections.find((s) => s.id === "products");
                if (productsSection) toggleNotRelevant(productsSection.id);
              }}
              isNotRelevant={profile.sections.find((s) => s.id === "products")?.isNotRelevant ?? false}
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
          navigate("/product-listing");
        }}
      />

      {/* Public Profile Preview */}
      <PublicProfilePreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        profile={profile}
        selectedLocale={selectedLocale}
      />
    </div>
  );
};

export default ExhibitorHub;
