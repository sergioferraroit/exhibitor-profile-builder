import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircularProgressRing } from '@/components/ui/circular-progress-ring';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Info } from 'lucide-react';
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
  fulfilledSections: number;
  totalSections: number;
}
export function ProfileHeader({
  companyName,
  completionPercentage,
  onOpenWizard,
  onOpenPreview,
  onUpdateCompanyName,
  fulfilledSections,
  totalSections
}: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(companyName);
  const {
    t
  } = useLanguage();
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
  return <>
      <header className="bg-card border-b">
        <div className="container mx-auto my-0 py-[8px]">
          <div className="flex items-center justify-between">
            {/* Left: Page title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-foreground">{t('profile.editCompanyProfile')}</h1>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px]">
                      <p>{t('profile.sectionsFulfilledTooltip')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>{fulfilledSections} of {totalSections} {t('profile.sectionsFulfilled')}</span>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-4">
              {/* Preview Button */}
              <Button variant="outline" onClick={onOpenPreview} className="h-12 gap-2">
                <Eye className="h-4 w-4" />
                {t('profile.preview')}
              </Button>

              {/* Complete Profile Button with embedded progress ring */}
              <Button onClick={onOpenWizard} className="h-12 gap-0 pl-1 pr-3">
                <CircularProgressRing value={completionPercentage} size={40} strokeWidth={4} variant="inverted" />
                <span className="px-3">{t('profile.fillProfile')}</span>
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
              <Input id="company-name" value={editedName} onChange={e => setEditedName(e.target.value)} placeholder={t('profile.enterCompanyName')} />
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
    </>;
}