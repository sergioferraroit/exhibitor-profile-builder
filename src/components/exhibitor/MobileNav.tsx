import { useState } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Home, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface NavChild {
  labelKey: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    labelKey: 'nav.myShow',
    children: [
      { labelKey: 'nav.adminMarketingOperations', href: '/admin-marketing-operations' },
      { labelKey: 'nav.editCompanyProfile', href: '/edit-company-profile' },
      { labelKey: 'nav.productListing', href: '/product-listing' },
      { labelKey: 'nav.addProductOrService', href: '/add-product' },
      { labelKey: 'nav.manageMeetings', href: 'https://meetings.example.com', external: true },
      { labelKey: 'nav.manageShares', href: '/manage-shares' },
      { labelKey: 'nav.shop', href: '/shop' },
      { labelKey: 'nav.exhibitorManual', href: '/exhibitor-manual' },
    ],
  },
  {
    labelKey: 'nav.myTeam',
    children: [
      { labelKey: 'nav.companyAdministrators', href: '/company-administrators' },
      { labelKey: 'nav.allocateBadges', href: '/allocate-badges' },
      { labelKey: 'nav.yourCompanyBadges', href: '/your-company-badges' },
    ],
  },
  {
    labelKey: 'nav.leadCapture',
    children: [
      { labelKey: 'nav.leadManagerApp', href: '/lead-manager-app' },
      { labelKey: 'nav.createOffer', href: '/create-offer' },
      { labelKey: 'nav.inviteYourCustomers', href: '/invite-customers' },
    ],
  },
  {
    labelKey: 'nav.analytics',
    children: [
      { labelKey: 'nav.exhibitorDashboard', href: '/exhibitor-dashboard' },
      { labelKey: 'nav.profileViewer', href: '/profile-viewer' },
      { labelKey: 'nav.benchmarkAnalytics', href: '/benchmark-analytics' },
    ],
  },
  {
    labelKey: 'nav.help',
    children: [
      { labelKey: 'nav.homePageGuidedTour', href: '/home-guided-tour' },
      { labelKey: 'nav.companyProfileHelp', href: '/company-profile-help' },
      { labelKey: 'nav.leadManagerAppHelp', href: '/lead-manager-help' },
      { labelKey: 'nav.offerHelp', href: '/offer-help' },
      { labelKey: 'nav.exhibitorDashboardHelp', href: '/exhibitor-dashboard-help' },
    ],
  },
];

interface MobileNavProps {
  eventEdition?: string;
  onEventEditionClick?: () => void;
}

export function MobileNav({ 
  eventEdition = 'The London Book Fair 2025',
  onEventEditionClick
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavItem | null>(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const handleClose = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.children) {
      setActiveSubmenu(item);
    }
  };

  const handleBackClick = () => {
    setActiveSubmenu(null);
  };

  const handleLinkClick = () => {
    handleClose();
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'en-GB': return 'English (GB)';
      case 'fr-FR': return 'Français';
      case 'ja-JP': return '日本語';
      default: return 'English (GB)';
    }
  };

  return (
    <>
      {/* Burger Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-topbar-muted/10 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-topbar-foreground" />
      </button>

      {/* Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-topbar">
          {/* Main Menu */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out",
              activeSubmenu ? "-translate-x-full" : "translate-x-0"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-end p-4 border-b border-topbar-muted/20">
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-topbar-muted/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-topbar-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Event Edition */}
              <div className="mb-4">
                <span className="text-xs text-topbar-muted uppercase tracking-wide">{t('mobile.eventEdition')}</span>
                <button
                  onClick={onEventEditionClick}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="text-base text-topbar-foreground">{eventEdition}</span>
                  <ChevronRight className="h-5 w-5 text-topbar-muted" />
                </button>
              </div>

              {/* Language */}
              <div className="mb-6 pb-6 border-b border-topbar-muted/20">
                <span className="text-xs text-topbar-muted uppercase tracking-wide">{t('topbar.language')}</span>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => handleLanguageChange('en-GB')}
                    className={cn(
                      "flex items-center justify-between w-full py-2 text-left rounded px-2",
                      language === 'en-GB' ? "bg-topbar-muted/20 text-topbar-foreground font-medium" : "text-topbar-foreground hover:bg-topbar-muted/10"
                    )}
                  >
                    <span className="text-base">English (GB)</span>
                    {language === 'en-GB' && <span className="text-topbar-foreground">✓</span>}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr-FR')}
                    className={cn(
                      "flex items-center justify-between w-full py-2 text-left rounded px-2",
                      language === 'fr-FR' ? "bg-topbar-muted/20 text-topbar-foreground font-medium" : "text-topbar-foreground hover:bg-topbar-muted/10"
                    )}
                  >
                    <span className="text-base">Français</span>
                    {language === 'fr-FR' && <span className="text-topbar-foreground">✓</span>}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('ja-JP')}
                    className={cn(
                      "flex items-center justify-between w-full py-2 text-left rounded px-2",
                      language === 'ja-JP' ? "bg-topbar-muted/20 text-topbar-foreground font-medium" : "text-topbar-foreground hover:bg-topbar-muted/10"
                    )}
                  >
                    <span className="text-base">日本語</span>
                    {language === 'ja-JP' && <span className="text-topbar-foreground">✓</span>}
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {/* Home */}
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 py-3 text-base transition-colors",
                    location.pathname === '/' ? "text-topbar-foreground font-medium" : "text-topbar-foreground hover:text-topbar-muted"
                  )}
                >
                  <Home className="h-5 w-5" />
                  {t('nav.home')}
                </Link>

                {/* Nav Items with Children */}
                {navItems.map((item) => (
                  <button
                    key={item.labelKey}
                    onClick={() => handleNavItemClick(item)}
                    className={cn(
                      "flex items-center justify-between w-full py-3 text-base text-left transition-colors",
                      item.children?.some(child => !child.external && location.pathname === child.href)
                        ? "text-topbar-foreground font-medium"
                        : "text-topbar-foreground hover:text-topbar-muted"
                    )}
                  >
                    {t(item.labelKey)}
                    <ChevronRight className="h-5 w-5 text-topbar-muted" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Submenu */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out bg-topbar",
              activeSubmenu ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Submenu Header */}
            <div className="flex items-center justify-between p-4 border-b border-topbar-muted/20">
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-topbar-muted/10 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-6 w-6 text-topbar-foreground" />
              </button>
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-topbar-muted/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-topbar-foreground" />
              </button>
            </div>

            {/* Submenu Title */}
            {activeSubmenu && (
              <div className="px-4 pt-6 pb-4">
                <h2 className="text-lg font-medium text-topbar-muted">{t(activeSubmenu.labelKey)}</h2>
              </div>
            )}

            {/* Submenu Content */}
            <div className="flex-1 overflow-y-auto px-4">
              <nav className="space-y-1">
                {activeSubmenu?.children?.map((child) => (
                  <div key={child.href}>
                    {child.external ? (
                      <a
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="flex items-center justify-between py-3 text-base text-topbar-foreground hover:text-topbar-muted transition-colors"
                      >
                        {t(child.labelKey)}
                        <ExternalLink className="h-4 w-4 text-topbar-muted" />
                      </a>
                    ) : (
                      <Link
                        to={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "block py-3 text-base transition-colors",
                          location.pathname === child.href
                            ? "text-topbar-foreground font-medium"
                            : "text-topbar-foreground hover:text-topbar-muted"
                        )}
                      >
                        {t(child.labelKey)}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
