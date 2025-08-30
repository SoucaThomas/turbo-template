import SubscriptionStatus from './SubscriptionStatus';

interface SubscriptionStatusDisplayProps {
  plan: string;
  status: string;
}

export default function SubscriptionStatusDisplay({
  plan,
  status,
}: SubscriptionStatusDisplayProps) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <p className='font-medium text-lg capitalize'>{plan} Plan</p>
        <p className='text-sm text-muted-foreground'>
          {status === 'trialing' ? 'Trial Period' : 'Active'}
        </p>
      </div>
      <SubscriptionStatus status={status} />
    </div>
  );
}
