import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Home, Settings, LogOut, Menu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Settings, label: 'Account Settings', href: '/dashboard/account' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = authClient.useSession();

  return (
    <SidebarProvider>
      <div className='flex h-full w-full'>
        <Sidebar className='border-r'>
          <SidebarHeader className='border-b p-4'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='lg:hidden p-1 hover:bg-accent rounded-md'>
                <Menu className='h-4 w-4' />
              </SidebarTrigger>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>T</span>
              </div>
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg font-semibold truncate'>Turbo</h2>
                <p className='text-xs text-muted-foreground truncate'>
                  Admin Panel
                </p>
              </div>
              <ModeToggle />
            </div>
          </SidebarHeader>

          <SidebarContent className='p-2'>
            <SidebarGroup>
              <SidebarGroupLabel>Search</SidebarGroupLabel>
              <SidebarInput placeholder='Search...' className='mb-2' />
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to='/'>
                        <Home className='h-4 w-4' />
                        <span>Back to Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {sidebarItems.map(item => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={window.location.pathname === item.href}
                      >
                        <Link to={item.href}>
                          <item.icon className='h-4 w-4' />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className='border-t p-4'>
            <div className='space-y-3'>
              {/* User Profile */}
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium'>
                  {session?.user.name?.charAt(0) || 'U'}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {session?.user.name}
                  </p>
                  <p className='text-xs text-muted-foreground truncate'>
                    {session?.user.email}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <Button
                variant='outline'
                size='sm'
                className='w-full'
                onClick={() => void authClient.signOut()}
              >
                <LogOut className='h-4 w-4 mr-2' />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className='flex-1 flex flex-col max-w-7xl mx-auto'>
          {/* Page Content */}
          <main className='flex-1 p-4'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
