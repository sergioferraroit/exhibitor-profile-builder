import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircularProgressRing } from '@/components/ui/circular-progress-ring';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Eye, Sparkles } from 'lucide-react';
import { Locale } from '@/types/exhibitor';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileHeaderProps {
  companyName: string;
  completionPercentage: number;
  selectedLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onOpenWizard: () => void;
  onOpenPreview: () => void;
  onUpdateCompanyName: (name: string) => void;
  onOpenAISetup?: () => void;
  availableLocales: Locale[];
  primaryLocale: Locale;
}

export function ProfileHeader({
  companyName,
  completionPercentage,
  selectedLocale,
  onLocaleChange,
  onOpenWizard,
  onOpenPreview,
  onUpdateCompanyName,
  onOpenAISetup,
  availableLocales,
  primaryLocale,
}: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(companyName);
  const { t } = useLanguage();

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
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-foreground">{t('profile.editCompanyProfile')}</h1>
            </div>

            {/* Right: Progress ring and buttons */}
            <div className="flex items-center gap-4">
              {/* Circular Progress Ring */}
              <CircularProgressRing value={completionPercentage} size={40} strokeWidth={4} />

              {/* AI Auto-fill Button */}
              {onOpenAISetup && (
                <Button variant="outline" onClick={onOpenAISetup} className="gap-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10">
                  <Sparkles className="h-4 w-4" />
                  {t('ai.autoFillProfile')}
                </Button>
              )}

              {/* Preview Button */}
              <Button variant="outline" onClick={onOpenPreview} className="gap-2">
                <Eye className="h-4 w-4" />
                {t('profile.preview')}
              </Button>

              {/* Complete Profile Button */}
              <Button onClick={onOpenWizard} className="gap-2">
                <Pencil className="h-4 w-4" />
                {t('profile.fillProfile')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pr-8">
            <DialogTitle>{t('profile.editCompanyName')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">{t('profile.companyName')}</Label>
              <Input
                id="company-name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder={t('profile.enterCompanyName')}
              />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="w-full sm:w-auto">
              {t('profile.cancel')}
            </Button>
            <Button onClick={handleSave} disabled={!editedName.trim()} className="w-full sm:w-auto">
              {t('profile.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
