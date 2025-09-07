import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className='space-y-4'>
      <h4 className='font-medium'>Active Sessions</h4>
      <Card className='border-red-200 bg-red-50'>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-2 text-red-600'>
            <AlertTriangle className='h-4 w-4' />
            <p>Error loading sessions: {error}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
