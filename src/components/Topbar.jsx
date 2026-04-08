
import React, { useState, useEffect } from 'react';
import { Search, Menu, LogOut, User, Settings, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Topbar = ({ onMenuClick, pageTitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleLogout = () => {
    if(window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD';
  };

  // Generate breadcrumbs based on path
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:flex items-center text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Home</span>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className={index === pathSegments.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>
                  {segment.replace('-', ' ')}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground bg-muted/50 hover:bg-muted"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4 mr-2" />
            Search products, orders, clients...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent h-10 px-2">
                <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-foreground leading-none">{user?.name || 'Admin'}</span>
                  <span className="text-xs text-muted-foreground mt-1">{user?.role || 'Administrator'}</span>
                </div>
                <Avatar className="w-8 h-8 rounded-lg border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary rounded-lg text-sm font-medium">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-foreground">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Orders">
            <CommandItem onSelect={() => { navigate('/orders/ORD-2024-001'); setSearchOpen(false); }}>
              <Search className="mr-2 h-4 w-4" />
              <span>ORD-2024-001 - Kai Nakamura</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Products">
            <CommandItem onSelect={() => { navigate('/products'); setSearchOpen(false); }}>
              <Search className="mr-2 h-4 w-4" />
              <span>Holley 750 CFM Double Pumper</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Clients">
            <CommandItem onSelect={() => { navigate('/clients'); setSearchOpen(false); }}>
              <User className="mr-2 h-4 w-4" />
              <span>Elena Vasquez</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Topbar;
