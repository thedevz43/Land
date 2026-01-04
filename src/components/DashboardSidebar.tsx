import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  Search,
  FileText,
  CreditCard,
  Upload,
  Users,
  Settings,
  BarChart3,
  ClipboardList,
  CheckSquare,
  AlertTriangle,
  History,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  // Citizen Items
  { href: '/dashboard', label: 'Dashboard', icon: Home, roles: ['citizen', 'officer', 'admin'] },
  { href: '/dashboard/my-lands', label: 'My Land Parcels', icon: Search, roles: ['citizen'] },
  { href: '/dashboard/mutation', label: 'Mutation Requests', icon: FileText, roles: ['citizen'] },
  { href: '/dashboard/tax', label: 'Tax Payments', icon: CreditCard, roles: ['citizen'] },
  { href: '/dashboard/documents', label: 'Documents', icon: Upload, roles: ['citizen'] },
  
  // Officer Items
  { href: '/dashboard/pending-applications', label: 'Pending Applications', icon: ClipboardList, roles: ['officer'] },
  { href: '/dashboard/approved', label: 'Approved Cases', icon: CheckSquare, roles: ['officer'] },
  { href: '/dashboard/disputes', label: 'Land Disputes', icon: AlertTriangle, roles: ['officer'] },
  { href: '/dashboard/search', label: 'Land Search', icon: Search, roles: ['officer'] },
  
  // Admin Items
  { href: '/dashboard/users', label: 'User Management', icon: Users, roles: ['admin'] },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'] },
  { href: '/dashboard/logs', label: 'Activity Logs', icon: History, roles: ['admin'] },
  { href: '/dashboard/roles', label: 'Role Management', icon: Shield, roles: ['admin'] },
  
  // Common
  { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['citizen', 'officer', 'admin'] },
];

const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border hidden lg:block">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Role Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
          <p className="text-sm font-medium capitalize flex items-center gap-2">
            <span className={cn(
              'w-2 h-2 rounded-full',
              user.role === 'admin' ? 'bg-destructive' :
              user.role === 'officer' ? 'bg-secondary' : 'bg-accent'
            )} />
            {user.role}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
