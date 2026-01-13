import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import logoPlaceholder from '@/assets/logo-placeholder.svg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { MobileNav } from './MobileNav';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface TopBarProps {
  eventName: string;
  eventDates: string;
  eventLocation: string;
  eventEdition: string;
  onEventEditionChange: (edition: string) => void;
}

export function TopBar({
  eventName,
  eventDates,
  eventLocation,
  eventEdition,
  onEventEditionChange
}: TopBarProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="text-topbar-foreground bg-[#1a1a1a]">
      {/* Desktop Layout */}
      <div className="hidden md:block container mx-auto py-3">
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
              <span className="text-xs text-topbar-muted">{t('topbar.language')}</span>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] h-8 bg-transparent border-none text-topbar-foreground text-sm p-0 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-GB">English (GB)</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                  <SelectItem value="ja-JP">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-topbar-muted">{t('topbar.eventEdition')}</span>
              <Select value={eventEdition} onValueChange={onEventEditionChange}>
                <SelectTrigger className="w-[180px] h-8 bg-transparent border-none text-topbar-foreground text-sm p-0 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">The London Book Fair 2025</SelectItem>
                  <SelectItem value="2024">The London Book Fair 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded hover:bg-topbar-muted/10 transition-colors focus:outline-none">
                  <img src={logoPlaceholder} alt="Company logo" className="h-12 w-12 object-contain" />
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white z-50">
                <div className="px-4 py-3">
                  <p className="text-xs text-muted-foreground">{t('topbar.companyName')}</p>
                  <p className="font-medium text-foreground">Acme Corporation</p>
                </div>
                <DropdownMenuSeparator />
                <div className="px-4 py-3">
                  <p className="text-xs text-muted-foreground">{t('topbar.standNumber')}</p>
                  <p className="font-medium text-foreground">E40</p>
                </div>
                <DropdownMenuSeparator />
                <div className="px-4 py-3">
                  <p className="text-xs text-muted-foreground">{t('topbar.digitalOffering')}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{t('topbar.exhibitorProfile')}</span>
                    <Link to="/shop" className="text-primary underline text-sm">{t('topbar.upgrade')}</Link>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/edit-company-profile" className="text-primary underline cursor-pointer px-4 py-2">
                    {t('topbar.editCompanyProfile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="text-primary underline cursor-pointer px-4 py-2">
                    {t('topbar.logout')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="md:hidden">
        {/* Row 1: Date and Location */}
        <div className="flex items-center justify-center gap-6 py-2 text-sm border-b border-topbar-muted/20">
          <div className="flex items-center gap-2 text-topbar-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{eventDates}</span>
          </div>
          <div className="flex items-center gap-2 text-topbar-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{eventLocation}</span>
          </div>
        </div>

        {/* Row 2: Logo, Company Dropdown, Burger Menu */}
        <div className="container mx-auto py-2">
          <div className="flex items-center justify-between">
            {/* Show Logo */}
            <div className="text-base font-bold tracking-wide">
              <span className="text-topbar-muted">THE LONDON</span>
              <br />
              <span className="text-topbar-foreground">BOOK FAIR</span>
            </div>

            {/* Right: Company Dropdown + Burger */}
            <div className="flex items-center gap-2">
              {/* Company Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 p-1 rounded hover:bg-topbar-muted/10 transition-colors focus:outline-none">
                    <img src={logoPlaceholder} alt="Company logo" className="h-10 w-10 object-contain" />
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white z-50">
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{t('topbar.companyName')}</p>
                    <p className="font-medium text-foreground">Acme Corporation</p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{t('topbar.standNumber')}</p>
                    <p className="font-medium text-foreground">E40</p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{t('topbar.digitalOffering')}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{t('topbar.exhibitorProfile')}</span>
                      <Link to="/shop" className="text-primary underline text-sm">{t('topbar.upgrade')}</Link>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/edit-company-profile" className="text-primary underline cursor-pointer px-4 py-2">
                      {t('topbar.editCompanyProfile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="text-primary underline cursor-pointer px-4 py-2">
                      {t('topbar.logout')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Burger Menu */}
              <MobileNav 
                eventEdition={eventEdition === '2025' ? 'The London Book Fair 2025' : 'The London Book Fair 2024'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
