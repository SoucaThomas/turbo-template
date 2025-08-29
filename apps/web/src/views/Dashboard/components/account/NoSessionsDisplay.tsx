import { Card, CardContent } from '@/components/ui/card';

export function NoSessionsDisplay() {
  return (
    <div className='space-y-4'>
      <h4 className='font-medium'>Active Sessions</h4>
      <Card className='border-[var(--border)]'>
        <CardContent className='pt-6'>
          <div className='text-center text-[var(--muted-foreground)]'>
            <p>No sessions available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
