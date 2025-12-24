import { useState } from 'react';
import { Sparkles, Check, Circle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProfileSection } from '@/types/exhibitor';
import { cn } from '@/lib/utils';

// Sections that can be AI-edited
// Sections that can be AI-edited (ordered for display)
const AI_EDITABLE_SECTIONS = [
  'logo',
  'description',
  'filters',
  'matchmaking',
  'products',
  'documents',
  'social-media',
  'cover-image',
  'why-visit',
];

interface AIFillProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: ProfileSection[];
  onFillSections: (sectionIds: string[]) => void;
}

export function AIFillProfileModal({ 
  isOpen, 
  onClose, 
  sections,
  onFillSections 
}: AIFillProfileModalProps) {
  const aiEditableSections = sections.filter(s => 
    AI_EDITABLE_SECTIONS.includes(s.id) && !s.isNotRelevant
  );

  const [selectedSections, setSelectedSections] = useState<string[]>(
    aiEditableSections.map(s => s.id)
  );

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleAll = () => {
    if (selectedSections.length === aiEditableSections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(aiEditableSections.map(s => s.id));
    }
  };

  const handleFill = () => {
    onFillSections(selectedSections);
    onClose();
  };

  const getSectionStatus = (section: ProfileSection) => {
    if (section.status === 'complete') {
      return { label: 'Completed', color: 'text-success' };
    }
    if (section.status === 'partial') {
      return { label: 'In progress', color: 'text-warning' };
    }
    return { label: 'Empty', color: 'text-foreground-secondary' };
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
                Fill profile with AI
              </DialogTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                Select the sections you want AI to automatically fill based on your company website.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Sections to fill
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAll}
              className="text-xs text-foreground-secondary hover:text-foreground"
            >
              {selectedSections.length === aiEditableSections.length ? 'Deselect all' : 'Select all'}
            </Button>
          </div>

          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-2">
              {aiEditableSections.map((section) => {
                const status = getSectionStatus(section);
                const isSelected = selectedSections.includes(section.id);

                return (
                  <div
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-border-strong"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSection(section.id)}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">
                        {section.name}
                      </p>
                      <p className={cn("text-xs", status.color)}>
                        {status.label}
                      </p>
                    </div>
                    {section.status === 'complete' && (
                      <Check className="h-4 w-4 text-success shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <p className="text-xs text-foreground-secondary italic">
            AI will use your company website to generate content. You can review and edit each section before publishing.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFill}
              disabled={selectedSections.length === 0}
              className="bg-primary hover:bg-primary-hover"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Fill {selectedSections.length} section{selectedSections.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
