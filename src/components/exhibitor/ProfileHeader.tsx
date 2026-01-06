import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Eye } from 'lucide-react';
import { Locale } from '@/types/exhibitor';

interface ProfileHeaderProps {
  companyName: string;
  completionPercentage: number;
  selectedLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onOpenWizard: () => void;
  onOpenPreview: () => void;
  onUpdateCompanyName: (name: string) => void;
  availableLocales: Locale[];
  primaryLocale: Locale;
}

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
};

export function ProfileHeader({
  companyName,
  completionPercentage,
  selectedLocale,
  onLocaleChange,
  onOpenWizard,
  onOpenPreview,
  onUpdateCompanyName,
  availableLocales,
  primaryLocale,
}: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(companyName);

  const handleOpenModal = () => {
    setEditedName(companyName);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdateCompanyName(editedName.trim());
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      <header className="bg-card border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            {/* Left: Page title */}
            <div>
              <h1 className="text-xl font-semibold text-foreground">Edit company profile</h1>
            </div>

            {/* Right: Progress, language, buttons */}
            <div className="flex items-center gap-6">
              {/* Completion Progress */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground-secondary">Profile complete</span>
                <span className="text-sm font-medium text-foreground">{completionPercentage}%</span>
                <div className="w-24">
                  <Progress value={completionPercentage} className="h-1.5" />
                </div>
              </div>

              {/* Language Selector */}
              <Select value={selectedLocale} onValueChange={(v) => onLocaleChange(v as Locale)}>
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLocales.map((locale) => (
                    <SelectItem key={locale} value={locale}>
                      {LOCALE_LABELS[locale]}
                      {locale === primaryLocale && (
                        <span className="ml-1 text-xs text-foreground-secondary">(Primary)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Preview Button */}
              <Button variant="outline" onClick={onOpenPreview} className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>

              {/* Fill Profile Button */}
              <Button onClick={onOpenWizard} className="gap-2">
                <Pencil className="h-4 w-4" />
                Fill profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pr-8">
            <DialogTitle>Edit Company Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!editedName.trim()} className="w-full sm:w-auto">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}