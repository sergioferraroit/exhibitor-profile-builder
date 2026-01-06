import { Calendar, MapPin, ChevronDown, QrCode } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TopBarProps {
  eventName: string;
  eventDates: string;
  eventLocation: string;
  language: string;
  onLanguageChange: (language: string) => void;
  eventEdition: string;
  onEventEditionChange: (edition: string) => void;
}

export function TopBar({
  eventName,
  eventDates,
  eventLocation,
  language,
  onLanguageChange,
  eventEdition,
  onEventEditionChange,
}: TopBarProps) {
  return (
    <div className="bg-topbar text-topbar-foreground">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Left: Event Branding */}
          <div className="flex items-center gap-6">
            <div className="text-lg font-bold tracking-wide">
              <span className="text-topbar-muted">THE LONDON</span>
              <br />
              <span className="text-topbar-foreground">BOOK FAIR</span>
            </div>
            <div className="h-8 w-px bg-topbar-muted/30" />
            <div className="flex flex-col gap-0.5 text-sm">
              <div className="flex items-center gap-2 text-topbar-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{eventDates}</span>
              </div>
              <div className="flex items-center gap-2 text-topbar-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{eventLocation}</span>
              </div>
            </div>
          </div>

          {/* Right: Selectors */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-topbar-muted">Language</span>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-[140px] h-8 bg-transparent border-none text-topbar-foreground text-sm p-0 focus:ring-0">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-GB">English (GB)</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                  <SelectItem value="ja-JP">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-topbar-muted">Event Edition</span>
              <Select value={eventEdition} onValueChange={onEventEditionChange}>
                <SelectTrigger className="w-[180px] h-8 bg-transparent border-none text-topbar-foreground text-sm p-0 focus:ring-0">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">The London Book Fair 2025</SelectItem>
                  <SelectItem value="2024">The London Book Fair 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button className="p-2 border border-topbar-muted/30 rounded hover:bg-topbar-muted/10 transition-colors">
              <QrCode className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}