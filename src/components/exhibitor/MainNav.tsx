import { Home, ExternalLink, ChevronDown } from 'lucide-react';
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
    ],
  },
  {
    label: 'My Team',
    children: [
      { label: 'Edit Company Profile', href: '/edit-company-profile' },
      { label: 'Add Product/Service', href: '/add-product' },
      { label: 'Upgrade Digital Package', href: '/shop' },
    ],
  },
  {
    label: 'Lead capture',
    children: [
      { label: 'Company Administrators', href: '/company-administrators' },
      { label: 'Allocate Badges', href: '/allocate-badges' },
      { label: 'Your Company Badges', href: '/your-company-badges' },
    ],
  },
  {
    label: 'Analytics',
    children: [
      { label: 'Lead Manager App', href: '/lead-manager-app' },
      { label: 'Create Offer', href: '/create-offer' },
      { label: 'Invite Your Customers', href: '/invite-customers' },
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
              "flex items-center justify-center h-10 w-10 rounded-md transition-colors relative",
              location.pathname === '/' 
                ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
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
                          "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent relative gap-1",
                          "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-transparent after:transition-colors",
                          "data-[state=open]:after:bg-primary",
                          isActiveSection(item.children) && "after:bg-primary",
                          "[&>svg]:hidden" // Hide the default chevron
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute left-0 top-full mt-0">
                        <ul className="w-[220px] p-2 bg-popover border rounded-md shadow-lg">
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
