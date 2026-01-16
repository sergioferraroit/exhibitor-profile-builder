import { useState, useEffect } from 'react';
import { Sparkles, Globe, Check, X, Pencil, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAIProfileExtraction, ExtractionStatus } from '@/hooks/useAIProfileExtraction';
import { ExtractedProfileData } from '@/lib/api/ai-profile';
import { Locale } from '@/types/exhibitor';
import { cn } from '@/lib/utils';

type Step = 'url-input' | 'extracting' | 'review' | 'complete';

type FieldAction = 'pending' | 'validated' | 'skipped' | 'edited';

interface FieldState {
  action: FieldAction;
  editedValue?: Record<Locale, string>;
}

interface AIProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: ExtractedProfileData, fieldStates: Record<string, FieldState>) => void;
  primaryLocale: Locale;
  secondaryLocales: Locale[];
}

const REVIEWABLE_FIELDS = [
  { id: 'companyDescription', label: 'Company Description', isMultiline: true },
  { id: 'whyVisit', label: 'Why Visit Our Stand', isMultiline: true },
  { id: 'logo', label: 'Logo', isImage: true },
  { id: 'coverImage', label: 'Cover Image', isImage: true },
  { id: 'socialMedia', label: 'Social Media Links', isSocial: true },
  { id: 'filterTags', label: 'Industry Tags', isTags: true },
  { id: 'matchmakingTags', label: 'Matchmaking Tags', isTags: true },
  { id: 'products', label: 'Products & Services', isProducts: true },
];

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'EN',
  'fr-FR': 'FR',
  'ja-JP': 'JA'
};

export function AIProfileSetupModal({
  isOpen,
  onClose,
  onComplete,
  primaryLocale,
  secondaryLocales,
}: AIProfileSetupModalProps) {
  const { t } = useLanguage();
  const safeSecondaryLocales = Array.isArray(secondaryLocales) ? secondaryLocales : [];
  const allLocales = [primaryLocale, ...safeSecondaryLocales];
  
  const [step, setStep] = useState<Step>('url-input');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(primaryLocale);
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>({});
  const [editingValue, setEditingValue] = useState<Record<Locale, string> | null>(null);

  const { startExtraction, extractedData, progress, error, reset } = useAIProfileExtraction(
    primaryLocale,
    secondaryLocales
  );

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('url-input');
      setWebsiteUrl('');
      setHasConsent(false);
      setCurrentFieldIndex(0);
      setFieldStates({});
      setEditingValue(null);
      reset();
    }
  }, [isOpen, reset]);

  const handleStartExtraction = async () => {
    if (!websiteUrl || !hasConsent) return;
    
    setStep('extracting');
    const result = await startExtraction(websiteUrl);
    
    if (result) {
      // Initialize all fields as pending
      const initialStates: Record<string, FieldState> = {};
      REVIEWABLE_FIELDS.forEach(field => {
        initialStates[field.id] = { action: 'pending' };
      });
      setFieldStates(initialStates);
      setStep('review');
    }
  };

  const handleFieldAction = (fieldId: string, action: FieldAction, editedValue?: Record<Locale, string>) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldId]: { action, editedValue }
    }));
    setEditingValue(null);
    
    // Auto-advance to next field
    if (currentFieldIndex < REVIEWABLE_FIELDS.length - 1) {
      setCurrentFieldIndex(prev => prev + 1);
    } else {
      // All fields reviewed
      setStep('complete');
    }
  };

  const handleComplete = () => {
    if (extractedData) {
      onComplete(extractedData, fieldStates);
    }
    onClose();
  };

  const getCurrentFieldValue = () => {
    if (!extractedData) return null;
    const field = REVIEWABLE_FIELDS[currentFieldIndex];
    return (extractedData as any)[field.id];
  };

  const getFieldStatusCounts = () => {
    const counts = { validated: 0, skipped: 0, edited: 0, pending: 0 };
    Object.values(fieldStates).forEach(state => {
      counts[state.action]++;
    });
    return counts;
  };

  const renderUrlInputStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website-url">{t('ai.enterWebsiteUrl')}</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
            <Input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://www.example.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border">
          <Checkbox
            id="consent"
            checked={hasConsent}
            onCheckedChange={(checked) => setHasConsent(checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">
              {t('ai.consentScraping')}
            </Label>
            <p className="text-xs text-foreground-secondary">
              {t('ai.consentDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button 
          onClick={handleStartExtraction}
          disabled={!websiteUrl || !hasConsent}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {t('ai.startExtraction')}
        </Button>
      </div>
    </div>
  );

  const renderExtractingStep = () => (
    <div className="py-8 space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{progress.message}</h3>
          <p className="text-sm text-foreground-secondary">
            {t('ai.pleaseWait')}
          </p>
        </div>

        <div className="w-full max-w-xs">
          <Progress value={progress.percentage} className="h-2" />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {progress.status === 'error' && (
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={() => { reset(); setStep('url-input'); }}>
            {t('common.tryAgain')}
          </Button>
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => {
    const currentField = REVIEWABLE_FIELDS[currentFieldIndex];
    const fieldValue = getCurrentFieldValue();
    const isEditing = editingValue !== null;

    return (
      <div className="space-y-4">
        {/* Progress indicator */}
        <div className="flex items-center justify-between text-sm text-foreground-secondary">
          <span>{t('ai.reviewingField')} {currentFieldIndex + 1} / {REVIEWABLE_FIELDS.length}</span>
          <div className="flex gap-2">
            {REVIEWABLE_FIELDS.map((field, idx) => (
              <div
                key={field.id}
                className={cn(
                  "w-2 h-2 rounded-full",
                  idx === currentFieldIndex ? "bg-primary" :
                  fieldStates[field.id]?.action === 'validated' ? "bg-success" :
                  fieldStates[field.id]?.action === 'skipped' ? "bg-muted-foreground" :
                  fieldStates[field.id]?.action === 'edited' ? "bg-warning" :
                  "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Field header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{currentField.label}</h3>
          {currentField.isMultiline && (
            <Tabs value={selectedLocale} onValueChange={(v) => setSelectedLocale(v as Locale)}>
              <TabsList className="h-8">
                {allLocales.map(locale => (
                  <TabsTrigger key={locale} value={locale} className="text-xs px-3">
                    {LOCALE_LABELS[locale]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        {/* Field content */}
        <ScrollArea className="h-[200px] rounded-lg border p-4">
          {currentField.isMultiline && fieldValue && (
            isEditing ? (
              <Textarea
                value={editingValue?.[selectedLocale] || ''}
                onChange={(e) => setEditingValue(prev => prev ? { ...prev, [selectedLocale]: e.target.value } : null)}
                className="min-h-[160px] resize-none"
              />
            ) : (
              <p className="text-sm whitespace-pre-wrap">
                {(fieldValue as Record<Locale, string>)[selectedLocale] || t('ai.noContentExtracted')}
              </p>
            )
          )}

          {currentField.isImage && (
            <div className="flex items-center justify-center h-full">
              {fieldValue ? (
                <img src={fieldValue} alt={currentField.label} className="max-h-[160px] object-contain" />
              ) : (
                <p className="text-foreground-secondary">{t('ai.noImageFound')}</p>
              )}
            </div>
          )}

          {currentField.isSocial && fieldValue && (
            <div className="space-y-2">
              {Object.entries(fieldValue as Record<string, string | null>).map(([platform, url]) => (
                <div key={platform} className="flex items-center gap-2">
                  <span className="capitalize font-medium text-sm w-24">{platform}:</span>
                  <span className="text-sm text-foreground-secondary truncate">
                    {url || t('ai.notFound')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {currentField.isTags && fieldValue && (
            <div className="flex flex-wrap gap-2">
              {(fieldValue as string[]).length > 0 ? (
                (fieldValue as string[]).map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-muted rounded-full text-xs">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-foreground-secondary">{t('ai.noTagsFound')}</p>
              )}
            </div>
          )}

          {currentField.isProducts && fieldValue && (
            <div className="space-y-3">
              {(fieldValue as any[]).length > 0 ? (
                (fieldValue as any[]).map((product, idx) => (
                  <div key={idx} className="p-2 bg-muted/50 rounded">
                    <p className="font-medium text-sm">{product.name?.[selectedLocale] || product.name?.['en-GB']}</p>
                    <p className="text-xs text-foreground-secondary line-clamp-2">
                      {product.description?.[selectedLocale] || product.description?.['en-GB']}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-foreground-secondary">{t('ai.noProductsFound')}</p>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentFieldIndex(prev => Math.max(0, prev - 1))}
            disabled={currentFieldIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('common.back')}
          </Button>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingValue(null)}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleFieldAction(currentField.id, 'edited', editingValue!)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  {t('ai.saveEdit')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFieldAction(currentField.id, 'skipped')}
                >
                  <X className="h-4 w-4 mr-1" />
                  {t('ai.skip')}
                </Button>
                {currentField.isMultiline && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingValue(fieldValue as Record<Locale, string>)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    {t('ai.edit')}
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => handleFieldAction(currentField.id, 'validated')}
                >
                  <Check className="h-4 w-4 mr-1" />
                  {t('ai.validate')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCompleteStep = () => {
    const counts = getFieldStatusCounts();
    
    return (
      <div className="py-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-success" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{t('ai.extractionComplete')}</h3>
            <p className="text-sm text-foreground-secondary">
              {t('ai.reviewSummary')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-success/10">
            <p className="text-2xl font-bold text-success">{counts.validated}</p>
            <p className="text-xs text-foreground-secondary">{t('ai.validated')}</p>
          </div>
          <div className="p-3 rounded-lg bg-warning/10">
            <p className="text-2xl font-bold text-warning">{counts.edited}</p>
            <p className="text-xs text-foreground-secondary">{t('ai.edited')}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted">
            <p className="text-2xl font-bold text-foreground-secondary">{counts.skipped}</p>
            <p className="text-xs text-foreground-secondary">{t('ai.skipped')}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => { setStep('review'); setCurrentFieldIndex(0); }}>
            {t('ai.reviewAgain')}
          </Button>
          <Button onClick={handleComplete}>
            {t('ai.applyChanges')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#F97316]/10">
              <Sparkles className="h-6 w-6 text-[#F97316]" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground">
                {t('ai.autoFillProfile')}
              </DialogTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                {step === 'url-input' && t('ai.autoFillDescription')}
                {step === 'extracting' && t('ai.extractingDescription')}
                {step === 'review' && t('ai.reviewDescription')}
                {step === 'complete' && t('ai.completeDescription')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {step === 'url-input' && renderUrlInputStep()}
          {step === 'extracting' && renderExtractingStep()}
          {step === 'review' && renderReviewStep()}
          {step === 'complete' && renderCompleteStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
