import { useState } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Home, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'My show',
    children: [
      { label: 'Admin, Marketing & Operations', href: '/admin-marketing-operations' },
      { label: 'Edit Company Profile', href: '/edit-company-profile' },
      { label: 'Product Listing', href: '/product-listing' },
      { label: 'Add Product or Service', href: '/add-product' },
      { label: 'Manage Meetings', href: 'https://meetings.example.com', external: true },
      { label: 'Manage Shares', href: '/manage-shares' },
      { label: 'Shop', href: '/shop' },
      { label: 'Exhibitor Manual', href: '/exhibitor-manual' },
    ],
  },
  {
    label: 'My team',
    children: [
      { label: 'Company Administrators', href: '/company-administrators' },
      { label: 'Allocate Badges', href: '/allocate-badges' },
      { label: 'Your Company Badges', href: '/your-company-badges' },
    ],
  },
  {
    label: 'Lead capture',
    children: [
      { label: 'Lead Manager App', href: '/lead-manager-app' },
      { label: 'Create Offer', href: '/create-offer' },
      { label: 'Invite Your Customers', href: '/invite-customers' },
    ],
  },
  {
    label: 'Analytics',
    children: [
      { label: 'Exhibitor Dashboard', href: '/exhibitor-dashboard' },
      { label: 'Profile Viewer', href: '/profile-viewer' },
      { label: 'Benchmark Analytics', href: '/benchmark-analytics' },
    ],
  },
  {
    label: 'Help',
    children: [
      { label: 'Home Page Guided Tour', href: '/home-guided-tour' },
      { label: 'Company Profile Help', href: '/company-profile-help' },
      { label: 'Lead Manager App Help', href: '/lead-manager-help' },
      { label: 'Offer Help', href: '/offer-help' },
      { label: 'Exhibitor Dashboard Help', href: '/exhibitor-dashboard-help' },
    ],
  },
];

interface MobileNavProps {
  eventEdition?: string;
  language?: string;
  onLanguageClick?: () => void;
  onEventEditionClick?: () => void;
}

export function MobileNav({ 
  eventEdition = 'The London Book Fair 2025',
  language = 'English (GB)',
  onLanguageClick,
  onEventEditionClick
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<NavItem | null>(null);
  const location = useLocation();

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
        <div className="fixed inset-0 z-50 bg-background">
          {/* Main Menu */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out",
              activeSubmenu ? "-translate-x-full" : "translate-x-0"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-end p-4 border-b">
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Event Edition */}
              <div className="mb-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Event edition</span>
                <button
                  onClick={onEventEditionClick}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="text-base">{eventEdition}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Language */}
              <div className="mb-6 pb-6 border-b">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Language</span>
                <button
                  onClick={onLanguageClick}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="text-base">{language}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {/* Home */}
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 py-3 text-base transition-colors",
                    location.pathname === '/' ? "text-primary font-medium" : "hover:text-primary"
                  )}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>

                {/* Nav Items with Children */}
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavItemClick(item)}
                    className={cn(
                      "flex items-center justify-between w-full py-3 text-base text-left transition-colors",
                      item.children?.some(child => !child.external && location.pathname === child.href)
                        ? "text-primary font-medium"
                        : "hover:text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Submenu */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out bg-background",
              activeSubmenu ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Submenu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleClose}
                className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Submenu Title */}
            {activeSubmenu && (
              <div className="px-4 pt-6 pb-4">
                <h2 className="text-lg font-medium text-muted-foreground">{activeSubmenu.label}</h2>
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
                        className="flex items-center justify-between py-3 text-base hover:text-primary transition-colors"
                      >
                        {child.label}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ) : (
                      <Link
                        to={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "block py-3 text-base transition-colors",
                          location.pathname === child.href
                            ? "text-primary font-medium"
                            : "hover:text-primary"
                        )}
                      >
                        {child.label}
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
