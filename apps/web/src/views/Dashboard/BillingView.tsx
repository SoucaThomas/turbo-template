import { AlertTriangle, RefreshCw } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CurrentSubscription from './components/billing/CurrentSubscription';
import { useBilling } from './components/billing/useBilling';

export default function BillingView() {
  const { activeSubscription, loading, error, refreshAll } = useBilling();

  if (loading) {
    return (
      <DashboardLayout>
        <div className='p-6 space-y-6'>
          <div>
            <Skeleton className='h-8 w-64 mb-2' />
            <Skeleton className='h-4 w-96' />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-48 mb-2' />
              <Skeleton className='h-4 w-80' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <Skeleton className='h-20 w-full' />
                <Skeleton className='h-20 w-full' />
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className='p-6 space-y-6'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Billing & Subscription
            </h2>
            <p className='text-muted-foreground'>
              Manage your subscription, billing information, and payment
              methods.
            </p>
          </div>

          <Alert variant='destructive'>
            <AlertTriangle className='h-4 w-4' />
            <AlertDescription>
              {error}
              <button
                onClick={() => void refreshAll()}
                className='ml-2 underline hover:no-underline'
              >
                Try again
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Billing & Subscription
            </h2>
            <p className='text-muted-foreground'>
              Manage your subscription, billing information, and payment
              methods.
            </p>
          </div>

          <button
            onClick={() => void refreshAll()}
            className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            <RefreshCw className='h-4 w-4' />
            Refresh
          </button>
        </div>

        {/* Current Subscription */}
        <CurrentSubscription
          subscription={activeSubscription || null}
          onRefresh={() => void refreshAll()}
        />
      </div>
    </DashboardLayout>
  );
}
