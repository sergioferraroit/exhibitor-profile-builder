import { Home, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

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

export function MainNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const isActiveSection = (children?: NavChild[]) => {
    if (!children) return false;
    return children.some(child => !child.external && location.pathname === child.href);
  };

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-1 py-1">
          {/* Home Icon */}
          <Link
            to="/"
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
              location.pathname === '/' 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <Home className="h-5 w-5" />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.labelKey}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "bg-transparent hover:bg-muted data-[state=open]:bg-muted",
                          isActiveSection(item.children) && "text-primary font-semibold"
                        )}
                      >
                        {t(item.labelKey)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[280px] gap-1 p-2 bg-popover border rounded-md shadow-lg">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                {child.external ? (
                                  <a
                                    href={child.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                      'flex items-center justify-between select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors',
                                      'hover:bg-accent hover:text-accent-foreground',
                                      'focus:bg-accent focus:text-accent-foreground'
                                    )}
                                  >
                                    {t(child.labelKey)}
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                  </a>
                                ) : (
                                  <Link
                                    to={child.href}
                                    className={cn(
                                      'block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors',
                                      'hover:bg-accent hover:text-accent-foreground',
                                      'focus:bg-accent focus:text-accent-foreground',
                                      location.pathname === child.href && 'bg-accent text-accent-foreground font-medium'
                                    )}
                                  >
                                    {t(child.labelKey)}
                                  </Link>
                                )}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href!}
                        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                      >
                        {t(item.labelKey)}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
    </nav>
  );
}
