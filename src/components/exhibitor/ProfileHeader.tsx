import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wand2, Globe, Eye } from 'lucide-react';
import { Locale } from '@/types/exhibitor';

interface ProfileHeaderProps {
  companyName: string;
  completionPercentage: number;
  selectedLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onOpenWizard: () => void;
  onOpenPreview: () => void;
  availableLocales: Locale[];
  primaryLocale: Locale;
}

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'English (UK)',
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
  availableLocales,
  primaryLocale,
}: ProfileHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{companyName}</h1>
            <p className="text-sm text-muted-foreground">Edit Company Profile</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Completion Progress */}
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Profile Complete</span>
                  <span className="text-xs font-bold text-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </div>

            {/* Language Selector */}
            <Select value={selectedLocale} onValueChange={(v) => onLocaleChange(v as Locale)}>
              <SelectTrigger className="w-[160px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLocales.map((locale) => (
                  <SelectItem key={locale} value={locale}>
                    {LOCALE_LABELS[locale]}
                    {locale === primaryLocale && (
                      <span className="ml-2 text-xs text-muted-foreground">(Primary)</span>
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

            {/* Wizard Button */}
            <Button onClick={onOpenWizard} className="gap-2">
              <Wand2 className="h-4 w-4" />
              Fill Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
