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
import { Eye } from 'lucide-react';
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
  availableLocales: Locale[];
  primaryLocale: Locale;
}

export function ProfileHeader({
  companyName,
  completionPercentage,
  onOpenWizard,
  onOpenPreview,
  onUpdateCompanyName,
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

            {/* Right: Buttons */}
            <div className="flex items-center gap-4">
              {/* Preview Button */}
              <Button variant="outline" onClick={onOpenPreview} className="gap-2">
                <Eye className="h-4 w-4" />
                {t('profile.preview')}
              </Button>

              {/* Complete Profile Button with embedded progress ring */}
              <Button onClick={onOpenWizard} className="gap-2.5 pl-1.5 h-11">
                <CircularProgressRing 
                  value={completionPercentage} 
                  size={36} 
                  strokeWidth={3} 
                  className="text-primary-foreground"
                  variant="inverted"
                />
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