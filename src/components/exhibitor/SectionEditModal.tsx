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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfileSection, Locale, SectionStatus, CompanyDocument } from '@/types/exhibitor';
import { useAISimulation } from '@/hooks/useAISimulation';
import { Sparkles, Loader2, RefreshCw, Globe, Upload, FileText, Plus, Trash2, Undo2 } from 'lucide-react';
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

const DOCUMENT_CATEGORIES = [
  { value: 'brochure', label: 'Brochure' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'white-paper', label: 'White Paper' },
  { value: 'press-release', label: 'Press Release' },
  { value: 'other', label: 'Other' },
];

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
  
  // Undo AI state
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  
  // Documents state
  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [newDocument, setNewDocument] = useState<Partial<CompanyDocument>>({
    name: '',
    description: '',
    category: 'brochure',
  });
  
  const { generateContent, isLoading, typewriterText, isTyping } = useAISimulation();

  useEffect(() => {
    const currentVal = section.localeData[selectedLocale]?.value;
    setValue(Array.isArray(currentVal) ? currentVal.join(', ') : currentVal || '');
    setPreviousValue(null); // Reset undo state on locale change
  }, [selectedLocale, section.localeData]);

  const handleAIGenerate = async () => {
    const aiType = getAITypeForSection(section.id);
    if (!aiType) return;
    
    setPreviousValue(value); // Save current value before AI generation
    
    const result = await generateContent(aiType, true);
    if (typeof result === 'string') {
      setValue(result);
    } else {
      setValue(result.join(', '));
    }
  };

  const handleUndoAI = () => {
    if (previousValue !== null) {
      setValue(previousValue);
      setPreviousValue(null);
    }
  };

  const handleSave = () => {
    if (section.id === 'documents') {
      const status: SectionStatus = documents.length > 0 ? 'complete' : 'empty';
      onSave(JSON.stringify(documents), status);
    } else {
      const status: SectionStatus = value.trim() ? 'complete' : 'empty';
      onSave(value.trim() || null, status);
    }
  };

  const handleAddDocument = () => {
    if (!newDocument.name?.trim()) return;
    
    const doc: CompanyDocument = {
      id: `doc-${Date.now()}`,
      name: newDocument.name.trim(),
      description: newDocument.description?.trim() || '',
      category: (newDocument.category as CompanyDocument['category']) || 'other',
      fileUrl: '', // Would be set after actual upload
      fileName: 'document.pdf', // Placeholder
    };
    
    setDocuments([...documents, doc]);
    setNewDocument({ name: '', description: '', category: 'brochure' });
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
  };

  const showAIButton = ['description', 'why-visit', 'filters', 'matchmaking', 'social-media'].includes(section.id);
  const isImageSection = ['logo', 'cover-image'].includes(section.id);
  const isDocumentsSection = section.id === 'documents';
  const isTextArea = ['description', 'why-visit'].includes(section.id);
  const isMultiValue = ['filters', 'matchmaking', 'brands', 'social-media'].includes(section.id);

  const displayValue = isTyping ? typewriterText : value;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl flex flex-col">
        <DialogHeader className="pr-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground-secondary">
              {completionPercentage}% PROFILE COMPLETE
            </span>
          </div>
          <Progress value={completionPercentage} className="h-1 mb-4" />
          
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-lg">{section.name}</DialogTitle>
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
          <p className="text-sm text-foreground-secondary">{section.description}</p>
        </DialogHeader>

        {/* Language Tabs - only show for non-document sections */}
        {!isDocumentsSection && (
          <Tabs value={selectedLocale} onValueChange={(v) => onLocaleChange(v as Locale)} className="mt-4">
            <TabsList className="w-full sm:w-auto flex overflow-x-auto">
              {availableLocales.map((locale) => (
                <TabsTrigger key={locale} value={locale} className="gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-initial">
                  <Globe className="h-3 w-3" />
                  <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
                  <span className="sm:hidden">{locale.split('-')[0].toUpperCase()}</span>
                  {locale === primaryLocale && (
                    <span className="text-xs text-foreground-secondary hidden sm:inline">(Primary)</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        <div className="space-y-4 mt-4">
          {isDocumentsSection ? (
            <div className="space-y-6">
              {/* Existing Documents */}
              {documents.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Uploaded Documents</Label>
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                      <FileText className="h-8 w-8 text-primary shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{doc.name}</p>
                        <p className="text-xs text-foreground-secondary truncate">{doc.description || 'No description'}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {DOCUMENT_CATEGORIES.find(c => c.value === doc.category)?.label}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Document Form */}
              <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
                <Label className="text-sm font-medium">Add New Document</Label>
                
                {/* PDF Upload */}
                <div className="space-y-2">
                  <Label className="text-xs text-foreground-secondary">PDF File</Label>
                  <div className="border rounded-lg p-4 text-center bg-muted/20">
                    <Upload className="h-6 w-6 mx-auto text-icon-soft mb-2" />
                    <p className="text-xs text-foreground-secondary mb-2">
                      Drag and drop or click to upload PDF
                    </p>
                    <Button variant="outline" size="sm">
                      Choose PDF
                    </Button>
                  </div>
                </div>

                {/* Document Name */}
                <div className="space-y-2">
                  <Label htmlFor="doc-name" className="text-xs text-foreground-secondary">
                    Document Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="doc-name"
                    value={newDocument.name || ''}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="e.g., Company Brochure 2024"
                  />
                </div>

                {/* Document Description */}
                <div className="space-y-2">
                  <Label htmlFor="doc-description" className="text-xs text-foreground-secondary">
                    Description
                  </Label>
                  <Textarea
                    id="doc-description"
                    value={newDocument.description || ''}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    placeholder="Brief description of the document content..."
                    rows={2}
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <Label className="text-xs text-foreground-secondary">Category</Label>
                  <Select
                    value={newDocument.category || 'brochure'}
                    onValueChange={(v) => setNewDocument({ ...newDocument, category: v as CompanyDocument['category'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddDocument}
                  disabled={!newDocument.name?.trim()}
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Document
                </Button>
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
                  previousValue !== null ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUndoAI}
                      className="gap-2 text-amber-600"
                    >
                      <Undo2 className="h-4 w-4" />
                      Undo AI
                    </Button>
                  ) : (
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
                  )
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
                    <span className="text-xs text-foreground-secondary">
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

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isTyping} className="w-full sm:w-auto">
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
