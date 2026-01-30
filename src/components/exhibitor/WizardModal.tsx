import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileSection, Locale, SectionStatus, WizardStep, SECTION_IDS } from '@/types/exhibitor';
import { AIWebsiteUrlModal } from './AIWebsiteUrlModal';
import { useWizardAI, AIFieldId } from '@/hooks/useWizardAI';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sparkles, 
  Loader2, 
  RefreshCw, 
  Globe, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Phone,
  SkipForward,
  Package,
  Undo2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: WizardStep[];
  sections: ProfileSection[];
  selectedLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  availableLocales: Locale[];
  primaryLocale: Locale;
  completionPercentage: number;
  onUpdateSection: (sectionId: string, locale: Locale, value: string | string[] | null, status: SectionStatus) => void;
  onSkipSection: (sectionId: string) => void;
  hasProducts: boolean;
  onNavigateToProducts: () => void;
}

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English (UK)',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
};

// AI-enabled fields mapping
const AI_FIELD_CONFIG: Record<string, { fieldId: AIFieldId; useLabel: string; undoLabel: string }> = {
  'description': { fieldId: 'description', useLabel: 'ai.useAIDescription', undoLabel: 'ai.undoAIDescription' },
  'why-visit': { fieldId: 'why-visit', useLabel: 'ai.useAIDescription', undoLabel: 'ai.undoAIDescription' },
  'logo': { fieldId: 'logo', useLabel: 'ai.useAILogo', undoLabel: 'ai.undoAILogo' },
  'cover-image': { fieldId: 'cover-image', useLabel: 'ai.useAIImage', undoLabel: 'ai.undoAIImage' },
  'social-media': { fieldId: 'social-media', useLabel: 'ai.useAILinks', undoLabel: 'ai.undoAILinks' },
  'filters': { fieldId: 'filters', useLabel: 'ai.useAITags', undoLabel: 'ai.undoAITags' },
  'matchmaking': { fieldId: 'matchmaking', useLabel: 'ai.useAITags', undoLabel: 'ai.undoAITags' },
  'products': { fieldId: 'products', useLabel: 'ai.useAIProducts', undoLabel: 'ai.undoAIProducts' },
};

export function WizardModal({
  isOpen,
  onClose,
  steps,
  sections,
  selectedLocale,
  onLocaleChange,
  availableLocales,
  primaryLocale,
  completionPercentage,
  onUpdateSection,
  onSkipSection,
  hasProducts,
  onNavigateToProducts,
}: WizardModalProps) {
  const { t } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [value, setValue] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [pendingAIAction, setPendingAIAction] = useState<AIFieldId | null>(null);

  const {
    websiteUrl,
    hasExtractedData,
    isExtracting,
    startExtraction,
    applyAIContent,
    undoAIContent,
    hasAIContent,
    reset: resetAI,
  } = useWizardAI(primaryLocale, availableLocales.filter(l => l !== primaryLocale));

  const currentStep = steps[currentStepIndex];
  const currentSection = sections.find(s => s.id === currentStep?.sectionId);
  const isLastStep = currentStepIndex === steps.length - 1;
  const isProductStep = currentStep?.sectionId === SECTION_IDS.PRODUCTS;

  // Reset values when step changes
  useEffect(() => {
    if (currentSection) {
      const currentVal = currentSection.localeData[selectedLocale]?.value;
      setValue(Array.isArray(currentVal) ? currentVal.join(', ') : currentVal || '');
    }
  }, [currentStepIndex, currentSection, selectedLocale]);

  // Reset AI state when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetAI();
      setCurrentStepIndex(0);
    }
  }, [isOpen, resetAI]);

  const handleAIButtonClick = (fieldId: AIFieldId) => {
    if (hasAIContent(fieldId)) {
      // Undo AI content
      const previousValue = undoAIContent(fieldId);
      setValue(previousValue ? (Array.isArray(previousValue) ? previousValue.join(', ') : previousValue) : '');
    } else if (!hasExtractedData && !websiteUrl) {
      // First time using AI - show URL modal
      setPendingAIAction(fieldId);
      setShowUrlModal(true);
    } else if (hasExtractedData) {
      // Apply AI content
      const aiValue = applyAIContent(fieldId, value || null);
      if (aiValue) {
        setValue(Array.isArray(aiValue) ? aiValue.join(', ') : aiValue);
      }
    }
  };

  const handleUrlConfirm = async (url: string) => {
    const success = await startExtraction(url);
    setShowUrlModal(false);
    
    if (success && pendingAIAction) {
      // Apply the AI content after extraction
      setTimeout(() => {
        const aiValue = applyAIContent(pendingAIAction, value || null);
        if (aiValue) {
          setValue(Array.isArray(aiValue) ? aiValue.join(', ') : aiValue);
        }
        setPendingAIAction(null);
      }, 100);
    }
  };

  const handleRegenerate = async () => {
    if (!currentSection || !websiteUrl) return;
    
    const fieldConfig = AI_FIELD_CONFIG[currentSection.id];
    if (!fieldConfig) return;

    // Re-extract and apply
    const success = await startExtraction(websiteUrl);
    if (success) {
      const aiValue = applyAIContent(fieldConfig.fieldId, value || null);
      if (aiValue) {
        setValue(Array.isArray(aiValue) ? aiValue.join(', ') : aiValue);
      }
    }
  };

  const handleValidate = () => {
    if (!currentSection) return;
    
    const status: SectionStatus = value.trim() ? 'complete' : 'empty';
    onUpdateSection(currentSection.id, selectedLocale, value.trim() || null, status);
    
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentSection && !currentSection.isMandatory) {
      onSkipSection(currentSection.id);
    }
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  if (steps.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              Profile Complete!
            </DialogTitle>
          </DialogHeader>
          <p className="text-foreground-secondary">
            Congratulations! Your profile is 100% complete. You can still edit individual sections if needed.
          </p>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const aiFieldConfig = currentSection ? AI_FIELD_CONFIG[currentSection.id] : null;
  const showAIButton = !!aiFieldConfig;
  const isAIActive = currentSection ? hasAIContent(aiFieldConfig?.fieldId as AIFieldId) : false;
  const isImageSection = currentSection && ['logo', 'cover-image'].includes(currentSection.id);
  const isTextArea = currentSection && ['description', 'why-visit'].includes(currentSection.id);

  const renderAIButton = () => {
    if (!showAIButton || !aiFieldConfig) return null;

    const isActive = hasAIContent(aiFieldConfig.fieldId);
    const label = isActive ? t(aiFieldConfig.undoLabel) : t(aiFieldConfig.useLabel);

    return (
      <Button
        variant={isActive ? "outline" : "ghost"}
        size="sm"
        onClick={() => handleAIButtonClick(aiFieldConfig.fieldId)}
        disabled={isExtracting}
        className={cn(
          "gap-2",
          isActive ? "border-amber-500 text-amber-600 hover:bg-amber-50" : "text-[#F97316]"
        )}
      >
        {isExtracting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isActive ? (
          <Undo2 className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {label}
      </Button>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl h-[100dvh] sm:h-[90vh] p-0 gap-0 flex flex-col">
          {/* Mobile: Top Progress Bar */}
          <div className="md:hidden p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-foreground-secondary">{completionPercentage}%</span>
            </div>
            <Progress value={(currentStepIndex + 1) / steps.length * 100} className="h-2" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Desktop: Sidebar */}
            <div className="hidden md:flex w-72 flex-col border-r bg-muted/30">
              <div className="p-4 border-b">
                <div className="text-sm font-medium text-foreground-secondary mb-1">Profile Completion</div>
                <div className="text-2xl font-bold text-foreground">{completionPercentage}%</div>
                <Progress value={completionPercentage} className="h-2 mt-2" />
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <button
                      key={step.sectionId}
                      onClick={() => setCurrentStepIndex(index)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                        index === currentStepIndex 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                        index < currentStepIndex 
                          ? "bg-success text-success-foreground"
                          : index === currentStepIndex
                            ? "bg-primary-foreground text-primary"
                            : "bg-foreground-disabled/20 text-foreground-secondary"
                      )}>
                        {index < currentStepIndex ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn(
                          "font-medium truncate text-sm",
                          index === currentStepIndex 
                            ? "text-primary-foreground" 
                            : "text-foreground"
                        )}>
                          {step.name}
                        </div>
                        {step.group === 'A' && (
                          <span className="text-xs opacity-70">High Impact</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <button className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  Call support
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              <DialogHeader className="p-4 sm:p-6 border-b pr-10">
                <div className="flex flex-wrap items-center gap-2">
                  <DialogTitle className="text-base sm:text-lg">{currentStep?.name}</DialogTitle>
                  {currentSection?.group === 'A' && (
                    <Badge variant="secondary" className="bg-high-impact/10 text-high-impact text-xs">
                      High Impact
                    </Badge>
                  )}
                  {currentSection?.isMandatory && (
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  )}
                </div>
                {currentSection && (
                  <p className="text-sm text-foreground-secondary">{currentSection.description}</p>
                )}
              </DialogHeader>

              {/* Language Tabs */}
              <div className="px-4 sm:px-6 pt-4 border-b overflow-x-auto">
                <div className="flex gap-1 sm:gap-2 min-w-max">
                  {availableLocales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => onLocaleChange(locale)}
                      className={cn(
                        "flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-t-lg transition-colors whitespace-nowrap",
                        selectedLocale === locale
                          ? "bg-background border border-b-0 font-medium"
                          : "text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      <Globe className="h-3 w-3" />
                      <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
                      <span className="sm:hidden">{locale.split('-')[0].toUpperCase()}</span>
                      {locale === primaryLocale && (
                        <span className="text-xs text-foreground-secondary hidden sm:inline">(Primary)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <ScrollArea className="flex-1 p-4 sm:p-6">
                {isProductStep ? (
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 mx-auto text-icon-soft mb-4" />
                    <h3 className="text-lg font-medium mb-2">Add Your First Product</h3>
                    <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
                      Products help visitors understand what you offer. Add at least one product to complete this step.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={onNavigateToProducts} className="gap-2">
                        <Package className="h-4 w-4" />
                        Go to Product Listing
                      </Button>
                      {showAIButton && (
                        renderAIButton()
                      )}
                    </div>
                  </div>
                ) : isImageSection ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-icon-soft mb-2" />
                      <p className="text-sm text-foreground-secondary mb-2">
                        Drag and drop or click to upload
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                    {showAIButton && (
                      <div className="flex items-center justify-center">
                        {renderAIButton()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>
                        {currentSection && ['filters', 'matchmaking', 'brands', 'social-media'].includes(currentSection.id)
                          ? 'Values (comma-separated)'
                          : 'Value'}
                      </Label>
                      {showAIButton && renderAIButton()}
                    </div>
                    
                    {isTextArea ? (
                      <div className="relative">
                        <Textarea
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder={`Enter ${currentSection?.name.toLowerCase()}...`}
                          rows={6}
                        />
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-foreground-secondary">
                            {value.length} / {currentSection?.id === 'why-visit' ? 200 : 600} characters
                          </span>
                          {isAIActive && hasExtractedData && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleRegenerate}
                              disabled={isExtracting}
                              className="gap-1 text-xs"
                            >
                              <RefreshCw className={cn("h-3 w-3", isExtracting && "animate-spin")} />
                              {t('ai.regenerate')}
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={`Enter ${currentSection?.name.toLowerCase()}...`}
                      />
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Footer Actions */}
              <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                <div className="order-2 sm:order-1">
                  {currentStepIndex > 0 && (
                    <Button variant="ghost" onClick={handleBack} className="gap-2 w-full sm:w-auto">
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 order-1 sm:order-2">
                  {!isProductStep && !currentSection?.isMandatory && (
                    <Button variant="ghost" onClick={handleSkip} className="gap-2">
                      <SkipForward className="h-4 w-4" />
                      Skip
                    </Button>
                  )}
                  {isProductStep ? (
                    <Button onClick={handleSkip} variant="outline" className="w-full sm:w-auto">
                      Skip for Now
                    </Button>
                  ) : (
                    <Button onClick={handleValidate} className="gap-2 w-full sm:w-auto">
                      {isLastStep ? 'Finish' : 'Validate'}
                      {!isLastStep && <ChevronRight className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Website URL Modal */}
      <AIWebsiteUrlModal
        isOpen={showUrlModal}
        onClose={() => {
          setShowUrlModal(false);
          setPendingAIAction(null);
        }}
        onConfirm={handleUrlConfirm}
        isLoading={isExtracting}
      />
    </>
  );
}
