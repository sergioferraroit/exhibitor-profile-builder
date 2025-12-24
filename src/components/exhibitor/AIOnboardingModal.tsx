import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AIOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (url: string) => void;
  onSkip: () => void;
}

export function AIOnboardingModal({ isOpen, onClose, onStart, onSkip }: AIOnboardingModalProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleStart = () => {
    if (websiteUrl.trim()) {
      onStart(websiteUrl.trim());
    }
  };

  const handleSkip = () => {
    onSkip();
    onClose();
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
                Auto-generate your exhibitor profile
              </DialogTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                Enter your website and let AI fill in your exhibitor profile.
                You can then review and validate each section before publishing.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Input
            type="url"
            placeholder="www.yourcompany.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full"
          />

          <p className="text-xs text-foreground-secondary italic">
            By providing my website URL, I authorize the AI Assistant to retrieve the information 
            needed to complete my exhibitor profile.
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="link"
              onClick={handleSkip}
              className="text-foreground-secondary hover:text-foreground"
            >
              I'll complete my profile manually
            </Button>
            <Button
              onClick={handleStart}
              disabled={!websiteUrl.trim()}
              className="bg-primary hover:bg-primary-hover"
            >
              Start
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
