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
import { useAISimulation } from '@/hooks/useAISimulation';
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
  Package
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [value, setValue] = useState('');
  const [translationStep, setTranslationStep] = useState<'primary' | Locale>('primary');
  
  const { generateContent, isLoading, typewriterText, isTyping } = useAISimulation();

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
    setTranslationStep('primary');
  }, [currentStepIndex, currentSection, selectedLocale]);

  const handleAIGenerate = async () => {
    if (!currentSection) return;
    const aiType = getAITypeForSection(currentSection.id);
    if (!aiType) return;
    
    const result = await generateContent(aiType, true);
    if (typeof result === 'string') {
      setValue(result);
    } else {
      setValue(result.join(', '));
    }
  };

  const handleGenerateTranslation = async (targetLocale: Locale) => {
    // Simulate translation generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In real app, this would call translation API
    setTranslationStep(targetLocale);
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
          <p className="text-muted-foreground">
            Congratulations! Your profile is 100% complete. You can still edit individual sections if needed.
          </p>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const showAIButton = currentSection && ['description', 'why-visit', 'filters', 'matchmaking', 'social-media'].includes(currentSection.id);
  const isImageSection = currentSection && ['logo', 'cover-image'].includes(currentSection.id);
  const isTextArea = currentSection && ['description', 'why-visit'].includes(currentSection.id);
  const displayValue = isTyping ? typewriterText : value;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0">
        {/* Mobile: Top Progress Bar */}
        <div className="md:hidden p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStepIndex + 1} of {steps.length}</span>
            <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
          </div>
          <Progress value={(currentStepIndex + 1) / steps.length * 100} className="h-2" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop: Sidebar */}
          <div className="hidden md:flex w-72 flex-col border-r bg-muted/30">
            <div className="p-4 border-b">
              <div className="text-sm font-medium text-muted-foreground mb-1">Profile Completion</div>
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
                          : "bg-muted-foreground/20 text-muted-foreground"
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
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                Call support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <DialogHeader className="p-6 border-b">
              <div className="flex items-center gap-2">
                <DialogTitle>{currentStep?.name}</DialogTitle>
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
                <p className="text-sm text-muted-foreground">{currentSection.description}</p>
              )}
            </DialogHeader>

            {/* Language Tabs */}
            <div className="px-6 pt-4 border-b">
              <div className="flex gap-2">
                {availableLocales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => onLocaleChange(locale)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-t-lg transition-colors",
                      selectedLocale === locale
                        ? "bg-background border border-b-0 font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Globe className="h-3 w-3" />
                    {LOCALE_LABELS[locale]}
                    {locale === primaryLocale && (
                      <span className="text-xs text-muted-foreground">(Primary)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="flex-1 p-6">
              {isProductStep ? (
                <div className="text-center py-8">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Add Your First Product</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Products help visitors understand what you offer. Add at least one product to complete this step.
                  </p>
                  <Button onClick={onNavigateToProducts} className="gap-2">
                    <Package className="h-4 w-4" />
                    Go to Product Listing
                  </Button>
                </div>
              ) : isImageSection ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop or click to upload
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                  {showAIButton && (
                    <Button
                      variant="outline"
                      onClick={handleAIGenerate}
                      disabled={isLoading(getAITypeForSection(currentSection!.id)!)}
                      className="gap-2"
                    >
                      {isLoading(getAITypeForSection(currentSection!.id)!) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      Suggest Images with AI
                    </Button>
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
                    {showAIButton && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleAIGenerate}
                        disabled={isLoading(getAITypeForSection(currentSection!.id)!)}
                        className="gap-2 text-primary"
                      >
                        {isLoading(getAITypeForSection(currentSection!.id)!) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Use AI
                      </Button>
                    )}
                  </div>
                  
                  {isTextArea ? (
                    <div className="relative">
                      <Textarea
                        value={displayValue}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={`Enter ${currentSection?.name.toLowerCase()}...`}
                        rows={6}
                        className={cn(isTyping && "typewriter-cursor")}
                        disabled={isTyping}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {displayValue.length} / {currentSection?.id === 'why-visit' ? 200 : 600} characters
                        </span>
                        {value && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleAIGenerate}
                            className="gap-1 text-xs"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Regenerate
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Input
                      value={displayValue}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={`Enter ${currentSection?.name.toLowerCase()}...`}
                      className={cn(isTyping && "typewriter-cursor")}
                      disabled={isTyping}
                    />
                  )}

                  {/* Translation Steps */}
                  {value && selectedLocale === primaryLocale && availableLocales.length > 1 && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-3">Generate Translations</h4>
                      <div className="space-y-2">
                        {availableLocales.filter(l => l !== primaryLocale).map((locale) => (
                          <div key={locale} className="flex items-center justify-between p-2 bg-background rounded">
                            <span className="text-sm">{LOCALE_LABELS[locale]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateTranslation(locale)}
                              className="gap-2"
                            >
                              <Sparkles className="h-3 w-3" />
                              Generate
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-6 border-t flex items-center justify-between">
              <div>
                {currentStepIndex > 0 && (
                  <Button variant="ghost" onClick={handleBack} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!isProductStep && !currentSection?.isMandatory && (
                  <Button variant="ghost" onClick={handleSkip} className="gap-2">
                    <SkipForward className="h-4 w-4" />
                    Skip
                  </Button>
                )}
                {isProductStep ? (
                  <Button onClick={handleSkip} variant="outline">
                    Skip for Now
                  </Button>
                ) : (
                  <Button onClick={handleValidate} disabled={isTyping} className="gap-2">
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
  );
}

function getAITypeForSection(sectionId: string): Parameters<ReturnType<typeof useAISimulation>['generateContent']>[0] | null {
  const mapping: Record<string, Parameters<ReturnType<typeof useAISimulation>['generateContent']>[0]> = {
    'description': 'company-description',
    'why-visit': 'why-visit',
    'filters': 'filter-tags',
    'matchmaking': 'matchmaking-tags',
    'social-media': 'social-links',
    'logo': 'logo-suggestions',
    'cover-image': 'cover-suggestions',
  };
  return mapping[sectionId] || null;
}
