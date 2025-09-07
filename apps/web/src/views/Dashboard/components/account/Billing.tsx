import { Link } from '@tanstack/react-router';
import { ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Billing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CreditCard className='h-5 w-5' />
          Billing & Subscription
        </CardTitle>
        <CardDescription>
          Manage your subscription, billing information, and payment methods.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm text-muted-foreground'>
              View and manage your subscription details, billing history, and
              account settings.
            </p>
          </div>
          <Button asChild>
            <Link to='/dashboard/billing'>
              Manage Billing
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
