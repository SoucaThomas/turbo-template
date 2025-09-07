import { createFileRoute } from '@tanstack/react-router';
import { BarChart3, FileText, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';

export const Route = createFileRoute('/dashboard/')({
  loader: async () => {
    const session = await authClient.getSession();
    return { session: session.data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useLoaderData();

  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!session) {
      showToast.info('Please sign in to access the dashboard');
      void navigate({
        to: '/login',
        search: { form: 'signin' },
      });
    } else {
      showToast.success(`Welcome back, ${session.user.name}!`);
    }
  }, [session, navigate]);

  if (!session) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-full'>
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>
            Welcome back, {session.user.name}!
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>2,350</div>
              <p className='text-xs text-muted-foreground'>
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Reports</CardTitle>
              <FileText className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>12,234</div>
              <p className='text-xs text-muted-foreground'>
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Analytics</CardTitle>
              <BarChart3 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Growth</CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12.5%</div>
              <p className='text-xs text-muted-foreground'>
                +4.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You have 3 new notifications today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>New user registration</p>
                  <p className='text-xs text-muted-foreground'>2 minutes ago</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Report generated successfully
                  </p>
                  <p className='text-xs text-muted-foreground'>1 hour ago</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    System maintenance scheduled
                  </p>
                  <p className='text-xs text-muted-foreground'>3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
