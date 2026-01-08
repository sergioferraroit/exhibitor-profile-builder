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
      { label: 'Admin, marketing and operations', href: '/admin-marketing-operations' },
      { label: 'Edit company profile', href: '/edit-company-profile' },
      { label: 'Product listing', href: '/product-listing' },
      { label: 'Add product or service', href: '/add-product' },
      { label: 'Manage meetings', href: 'https://meetings.example.com', external: true },
      { label: 'Manage shares', href: '/manage-shares' },
      { label: 'Shop', href: '/shop' },
      { label: 'Exhibitor manual', href: '/exhibitor-manual' },
      { label: 'My team', href: '/my-team' },
      { label: 'Company administrators', href: '/company-administrators' },
      { label: 'Allocate badges', href: '/allocate-badges' },
      { label: 'Your company badges', href: '/your-company-badges' },
    ],
  },
  {
    label: 'Lead capture',
    children: [
      { label: 'Lead Manager App', href: '/lead-manager-app' },
      { label: 'Create Offer', href: '/create-offer' },
      { label: 'Invite your customers', href: '/invite-customers' },
      { label: 'Analytics', href: '/analytics' },
    ],
  },
  {
    label: 'Exhibitor Dashboard',
    children: [
      { label: 'Profile Viewer', href: '/profile-viewer' },
      { label: 'Benchmark analytics', href: '/benchmark-analytics' },
    ],
  },
  {
    label: 'Help',
    children: [
      { label: 'Home page guided tour', href: '/home-guided-tour' },
      { label: 'Company profile help', href: '/company-profile-help' },
      { label: 'Lead Manager App help', href: '/lead-manager-help' },
      { label: 'Offer help', href: '/offer-help' },
      { label: 'Exhibitor Dashboard help', href: '/exhibitor-dashboard-help' },
    ],
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto">
        <div className="flex items-center gap-1 py-1">
          {/* Home Icon */}
          <Link
            to="/"
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors",
              location.pathname === '/' && "bg-muted"
            )}
          >
            <Home className="h-5 w-5 text-foreground" />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-muted data-[state=open]:bg-muted">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[280px] gap-1 p-2">
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
                                    {child.label}
                                    <ExternalLink className="h-3 w-3 ml-2 opacity-50" />
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
                                    {child.label}
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
                        to={item.href || '/'}
                        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                      >
                        {item.label}
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
