import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';

interface SubscriptionStatusProps {
  status: string;
}

export default function SubscriptionStatus({
  status,
}: SubscriptionStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className='h-4 w-4 text-green-500' />;
      case 'trialing':
        return <Clock className='h-4 w-4 text-blue-500' />;
      case 'canceled':
        return <AlertTriangle className='h-4 w-4 text-red-500' />;
      case 'past_due':
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />;
      default:
        return <AlertTriangle className='h-4 w-4 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'trialing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-green-200';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} border`}>
      {getStatusIcon(status)}
      <span className='ml-1 capitalize'>{status}</span>
    </Badge>
  );
}
