import { Home, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'My show',
    children: [
      { label: 'Overview', href: '/my-show' },
      { label: 'Schedule', href: '/my-show/schedule' },
    ],
  },
  {
    label: 'My team',
    children: [
      { label: 'Team members', href: '/my-team' },
      { label: 'Invitations', href: '/my-team/invitations' },
    ],
  },
  {
    label: 'Lead capture',
    children: [
      { label: 'Leads', href: '/leads' },
      { label: 'Reports', href: '/leads/reports' },
    ],
  },
  {
    label: 'Analytics',
    children: [
      { label: 'Dashboard', href: '/analytics' },
      { label: 'Reports', href: '/analytics/reports' },
    ],
  },
  {
    label: 'Help',
    children: [
      { label: 'FAQ', href: '/help' },
      { label: 'Contact support', href: '/help/contact' },
    ],
  },
];

export function MainNav() {
  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto">
        <div className="flex items-center gap-1 py-1">
          {/* Home Icon */}
          <a
            href="/"
            className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
          >
            <Home className="h-5 w-5 text-foreground" />
          </a>

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
                        <ul className="grid w-[200px] gap-1 p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.href}
                                  className={cn(
                                    'block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors',
                                    'hover:bg-accent hover:text-accent-foreground',
                                    'focus:bg-accent focus:text-accent-foreground'
                                  )}
                                >
                                  {child.label}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                      >
                        {item.label}
                      </a>
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