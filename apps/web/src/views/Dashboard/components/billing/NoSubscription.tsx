import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NoSubscription() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-yellow-500' />
          No Active Subscription
        </CardTitle>
        <CardDescription>
          Get started with a subscription to unlock all features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <p className='text-sm text-muted-foreground'>
            You don&apos;t have an active subscription yet. Choose a plan to get
            started.
          </p>
          <Button onClick={() => (window.location.href = '/pricing')}>
            View Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
