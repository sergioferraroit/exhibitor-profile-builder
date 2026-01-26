import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AIWebsiteUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (websiteUrl: string) => void;
  isLoading?: boolean;
}

export function AIWebsiteUrlModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: AIWebsiteUrlModalProps) {
  const { t } = useLanguage();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [hasConsent, setHasConsent] = useState(false);

  const handleConfirm = () => {
    if (websiteUrl && hasConsent) {
      onConfirm(websiteUrl);
    }
  };

  const handleClose = () => {
    setWebsiteUrl('');
    setHasConsent(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#F97316]/10">
              <Sparkles className="h-5 w-5 text-[#F97316]" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">
                {t('ai.enableAIFeatures')}
              </DialogTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                {t('ai.enterWebsiteToExtract')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="website-url">{t('ai.companyWebsite')}</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
              <Input
                id="website-url"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
            <Checkbox
              id="consent"
              checked={hasConsent}
              onCheckedChange={(checked) => setHasConsent(checked === true)}
              disabled={isLoading}
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

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading} className="w-full sm:w-auto">
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!websiteUrl || !hasConsent || isLoading}
            className="gap-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('ai.extracting')}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                {t('ai.startExtraction')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
