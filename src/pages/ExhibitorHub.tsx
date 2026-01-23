import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { AIProfileSetupModal } from "@/components/exhibitor/AIProfileSetupModal";
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
  const [isAISetupOpen, setIsAISetupOpen] = useState(false);

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
        onOpenAISetup={() => setIsAISetupOpen(true)}
        availableLocales={[profile.primaryLocale, ...profile.secondaryLocales]}
        primaryLocale={profile.primaryLocale}
      />

      <main className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6 bg-muted/50 p-1 rounded-lg border border-border">
            <TabsTrigger
              value="profile"
              className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md transition-all"
            >
              {t("exhibitor.companyProfile")}
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md transition-all"
            >
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

      {/* AI Profile Setup Modal */}
      <AIProfileSetupModal
        isOpen={isAISetupOpen}
        onClose={() => setIsAISetupOpen(false)}
        onComplete={(data, fieldStates) => {
          // Apply the extracted data to the profile
          const allLocales: Locale[] = [profile.primaryLocale, ...profile.secondaryLocales];

          Object.entries(fieldStates).forEach(([fieldId, state]) => {
            if (state.action === "validated" || state.action === "edited") {
              const value = state.editedValue || (data as any)[fieldId];

              if (value && fieldId === "companyDescription") {
                // Update description for all locales
                allLocales.forEach((locale) => {
                  if (value[locale]) {
                    updateSection("description", locale, value[locale], "complete");
                  }
                });
              } else if (value && fieldId === "whyVisit") {
                // Update why-visit for all locales
                allLocales.forEach((locale) => {
                  if (value[locale]) {
                    updateSection("why-visit", locale, value[locale], "complete");
                  }
                });
              } else if (value && fieldId === "logo") {
                // Update logo (same URL for all locales)
                allLocales.forEach((locale) => {
                  updateSection("logo", locale, value, "complete");
                });
              } else if (value && fieldId === "coverImage") {
                // Update cover image (same URL for all locales)
                allLocales.forEach((locale) => {
                  updateSection("cover-image", locale, value, "complete");
                });
              } else if (value && fieldId === "socialMedia") {
                const socialLinks = Object.entries(value)
                  .filter(([_, url]) => url)
                  .map(([platform, url]) => `${platform}: ${url}`)
                  .join("\n");
                allLocales.forEach((locale) => {
                  updateSection("social-media", locale, socialLinks, "complete");
                });
              } else if (value && fieldId === "filterTags") {
                const tagsString = Array.isArray(value) ? value.join(", ") : value;
                allLocales.forEach((locale) => {
                  updateSection("filters", locale, tagsString, "complete");
                });
              } else if (value && fieldId === "matchmakingTags") {
                const tagsString = Array.isArray(value) ? value.join(", ") : value;
                allLocales.forEach((locale) => {
                  updateSection("matchmaking", locale, tagsString, "complete");
                });
              } else if (value && fieldId === "products" && Array.isArray(value)) {
                // Add extracted products
                value.forEach(
                  (extractedProduct: { name: Record<Locale, string>; description: Record<Locale, string> }) => {
                    const newProduct = {
                      name:
                        extractedProduct.name?.[profile.primaryLocale] ||
                        extractedProduct.name?.["en-GB"] ||
                        "Untitled Product",
                      description:
                        extractedProduct.description?.[profile.primaryLocale] ||
                        extractedProduct.description?.["en-GB"] ||
                        "",
                      categories: [] as string[],
                      images: [] as string[],
                      documents: [] as {
                        id: string;
                        name: string;
                        type: "brochure" | "case-study" | "white-paper" | "press-release" | "other";
                        url: string;
                      }[],
                      status: "draft" as const,
                      localeData: allLocales.reduce(
                        (acc, locale) => {
                          acc[locale] = {
                            name:
                              extractedProduct.name?.[locale] || extractedProduct.name?.["en-GB"] || "Untitled Product",
                            description:
                              extractedProduct.description?.[locale] || extractedProduct.description?.["en-GB"] || "",
                          };
                          return acc;
                        },
                        {} as Record<Locale, { name: string; description: string }>,
                      ),
                    };
                    addProduct(newProduct);
                  },
                );
              }
            }
          });
          toast.success(t("ai.profileUpdated"));
        }}
        primaryLocale={profile.primaryLocale}
        secondaryLocales={profile.secondaryLocales}
      />
    </div>
  );
};

export default ExhibitorHub;
