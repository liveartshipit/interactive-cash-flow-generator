import React from 'react';
import { LayoutDashboardIcon, ArrowLeftRightIcon, BarChart3Icon, SettingsIcon, UserIcon, HelpCircleIcon, LogOutIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '../stores/appStore';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { currentView, setCurrentView } = useAppStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRightIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3Icon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const utilityItems = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'support', label: 'Support', icon: HelpCircleIcon },
    { id: 'logout', label: 'Log out', icon: LogOutIcon },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-secondary text-secondary-foreground transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6">
            <h1 className="font-sans text-2xl font-bold text-secondary-foreground">FlowGen</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="bg-transparent text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground lg:hidden"
            >
              <XIcon className="h-6 w-6" strokeWidth={1.5} />
            </Button>
          </div>

          <nav className="flex-1 space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start gap-3 bg-transparent text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground ${
                    isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground' : ''
                  }`}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="font-normal">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="space-y-2 px-4 pb-6">
            <Separator className="mb-4 bg-secondary-foreground/20" />
            {utilityItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 bg-transparent text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground"
                  onClick={() => {
                    if (item.id === 'logout') {
                      console.log('Logging out...');
                    }
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="font-normal">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
