import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useLocation,
  useRouterState,
} from '@tanstack/react-router';
import {
  TanStackRouterDevtools,
  TanStackRouterDevtoolsPanel,
} from '@tanstack/react-router-devtools';
import Header from '@/components/layout/Header';
import Loader from '@/components/loader';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/query-client';
import '../index.css';

export const links = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Dashboard', to: '/dashboard' },
];

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'turbo-template',
      },
      {
        name: 'description',
        content: 'turbo-template is a web application',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: s => s.isLoading,
  });

  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
        storageKey='vite-ui-theme'
      >
        <div
          className={`${isDashboardRoute ? 'h-svh w-full flex justify-center' : 'grid grid-rows-[auto_1fr] h-svh'}`}
        >
          {!isDashboardRoute && <Header links={links} />}
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position='bottom-left' />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </QueryClientProvider>
  );
}
