import { Calendar, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SubscriptionDetailsProps {
  periodStart: string;
  periodEnd: string;
  trialEnd?: string;
}

export default function SubscriptionDetails({
  periodStart,
  periodEnd,
  trialEnd,
}: SubscriptionDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Separator />

      {/* Subscription Details */}
      <div className='grid grid-cols-1 gap-4'>
        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4 text-muted-foreground' />
          <div>
            <p className='text-sm font-medium'>Current Period</p>
            <p className='text-sm text-muted-foreground'>
              {formatDate(periodStart)} - {formatDate(periodEnd)}
            </p>
          </div>
        </div>
      </div>

      {/* Trial Information */}
      {trialEnd && (
        <div className='bg-blue-50 p-3 rounded-lg border border-blue-200'>
          <p className='text-sm text-blue-800'>
            🎉 <strong>Trial Period:</strong> Your trial ends on{' '}
            {formatDate(trialEnd)}
          </p>
        </div>
      )}
    </>
  );
}
