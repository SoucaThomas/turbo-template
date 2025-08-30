import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onBillingPortal: () => void;
  loading: boolean;
}

export default function ActionButtons({
  onBillingPortal,
  loading,
}: ActionButtonsProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      <Button variant='outline' onClick={onBillingPortal} disabled={loading}>
        <Settings className='h-4 w-4 mr-2' />
        Manage Subscription
      </Button>
    </div>
  );
}
