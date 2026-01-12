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
      { label: 'Admin, Marketing & Operations', href: '/admin-marketing-operations' },
      { label: 'Edit Company Profile', href: '/edit-company-profile' },
      { label: 'Product Listing', href: '/product-listing' },
      { label: 'Add Product or Service', href: '/add-product' },
      { label: 'Manage Meetings', href: 'https://meetings.example.com', external: true },
      { label: 'Manage Shares', href: '/manage-shares' },
      { label: 'Shop', href: '/shop' },
      { label: 'Exhibitor Manual', href: '/exhibitor-manual' },
      { label: 'My Team', href: '/my-team' },
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

export function MainNav() {
  const location = useLocation();

  const isActiveSection = (children?: NavChild[]) => {
    if (!children) return false;
    return children.some(child => !child.external && location.pathname === child.href);
  };

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-1 py-1">
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
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "bg-transparent hover:bg-muted data-[state=open]:bg-muted",
                          isActiveSection(item.children) && "text-primary font-semibold"
                        )}
                      >
                        {item.label}
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
                                    {child.label}
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
                        to={item.href!}
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
