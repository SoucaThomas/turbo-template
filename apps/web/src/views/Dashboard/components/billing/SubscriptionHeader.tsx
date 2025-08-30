import { Crown } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscriptionHeader() {
  return (
    <CardHeader>
      <CardTitle className='flex items-center gap-2'>
        <Crown className='h-5 w-5 text-yellow-500' />
        Current Subscription
      </CardTitle>
      <CardDescription>
        Your subscription details and management options
      </CardDescription>
    </CardHeader>
  );
}
