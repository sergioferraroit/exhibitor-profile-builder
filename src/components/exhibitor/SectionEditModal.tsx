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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection, Locale, SectionStatus } from '@/types/exhibitor';
import { useAISimulation } from '@/hooks/useAISimulation';
import { Sparkles, Loader2, RefreshCw, Globe, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: ProfileSection;
  selectedLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  availableLocales: Locale[];
  primaryLocale: Locale;
  completionPercentage: number;
  onSave: (value: string | string[] | null, status: SectionStatus) => void;
}

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English (UK)',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
};

export function SectionEditModal({
  isOpen,
  onClose,
  section,
  selectedLocale,
  onLocaleChange,
  availableLocales,
  primaryLocale,
  completionPercentage,
  onSave,
}: SectionEditModalProps) {
  const currentValue = section.localeData[selectedLocale]?.value;
  const [value, setValue] = useState<string>(
    Array.isArray(currentValue) ? currentValue.join(', ') : currentValue || ''
  );
  
  const { generateContent, isLoading, typewriterText, isTyping } = useAISimulation();

  useEffect(() => {
    const currentVal = section.localeData[selectedLocale]?.value;
    setValue(Array.isArray(currentVal) ? currentVal.join(', ') : currentVal || '');
  }, [selectedLocale, section.localeData]);

  const handleAIGenerate = async () => {
    const aiType = getAITypeForSection(section.id);
    if (!aiType) return;
    
    const result = await generateContent(aiType, true);
    if (typeof result === 'string') {
      setValue(result);
    } else {
      setValue(result.join(', '));
    }
  };

  const handleSave = () => {
    const status: SectionStatus = value.trim() ? 'complete' : 'empty';
    onSave(value.trim() || null, status);
  };

  const showAIButton = ['description', 'why-visit', 'filters', 'matchmaking', 'social-media'].includes(section.id);
  const isImageSection = ['logo', 'cover-image'].includes(section.id);
  const isTextArea = ['description', 'why-visit'].includes(section.id);
  const isMultiValue = ['filters', 'matchmaking', 'brands', 'social-media'].includes(section.id);

  const displayValue = isTyping ? typewriterText : value;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              {completionPercentage}% PROFILE COMPLETE
            </span>
          </div>
          <Progress value={completionPercentage} className="h-1 mb-4" />
          
          <div className="flex items-center gap-2">
            <DialogTitle>{section.name}</DialogTitle>
            {section.group === 'A' && (
              <Badge variant="secondary" className="bg-high-impact/10 text-high-impact text-xs">
                High Impact
              </Badge>
            )}
            {section.isMandatory && (
              <Badge variant="outline" className="text-xs">
                Required
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </DialogHeader>

        {/* Language Tabs */}
        <Tabs value={selectedLocale} onValueChange={(v) => onLocaleChange(v as Locale)} className="mt-4">
          <TabsList>
            {availableLocales.map((locale) => (
              <TabsTrigger key={locale} value={locale} className="gap-2">
                <Globe className="h-3 w-3" />
                {LOCALE_LABELS[locale]}
                {locale === primaryLocale && (
                  <span className="text-xs text-muted-foreground">(Primary)</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4 mt-4">
          {isImageSection ? (
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
                  disabled={isLoading(getAITypeForSection(section.id)!)}
                  className="gap-2"
                >
                  {isLoading(getAITypeForSection(section.id)!) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Suggest Images with AI
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{isMultiValue ? 'Values (comma-separated)' : 'Value'}</Label>
                {showAIButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAIGenerate}
                    disabled={isLoading(getAITypeForSection(section.id)!)}
                    className="gap-2 text-primary"
                  >
                    {isLoading(getAITypeForSection(section.id)!) ? (
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
                    placeholder={`Enter ${section.name.toLowerCase()}...`}
                    rows={4}
                    className={cn(isTyping && "typewriter-cursor")}
                    disabled={isTyping}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {displayValue.length} / {section.id === 'why-visit' ? 200 : 600} characters
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
                  placeholder={`Enter ${section.name.toLowerCase()}...`}
                  className={cn(isTyping && "typewriter-cursor")}
                  disabled={isTyping}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isTyping}>
            Save
          </Button>
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
