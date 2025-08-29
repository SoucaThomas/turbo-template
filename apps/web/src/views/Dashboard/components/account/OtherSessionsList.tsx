import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import { SessionCard } from './SessionCard';
import { type Session } from '@/lib/auth-client';

interface OtherSessionsListProps {
  otherSessions: Session[];
  onRevokeSession: (token: string) => void;
  isRevoking: boolean;
}

export function OtherSessionsList({
  otherSessions,
  onRevokeSession,
  isRevoking,
}: OtherSessionsListProps) {
  if (otherSessions.length === 0) {
    return (
      <Card className='border-[var(--border)]'>
        <CardContent className='pt-6'>
          <div className='text-center text-[var(--muted-foreground)]'>
            <XCircle className='h-8 w-8 mx-auto mb-2 text-[var(--muted)]' />
            <p>No other active sessions</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h5 className='font-medium text-sm text-[var(--muted-foreground)]'>
          Other Active Sessions
        </h5>
        <span className='text-xs text-[var(--muted-foreground)]'>
          {otherSessions.length} session(s)
        </span>
      </div>
      {otherSessions.map(session => (
        <Card key={session.id} className='border-[var(--border)]'>
          <CardContent className='pt-4'>
            <SessionCard
              session={session}
              isCurrentSession={false}
              onRevoke={() => onRevokeSession(session.token)}
              isRevoking={isRevoking}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
