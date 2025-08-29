import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SessionCard } from './SessionCard';
import { type Session } from '@/lib/auth-client';

interface CurrentSessionCardProps {
  currentSession: Session;
}

export function CurrentSessionCard({
  currentSession,
}: CurrentSessionCardProps) {
  return (
    <Card className='border-[var(--accent)] bg-[var(--accent)]'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-5 w-5 text-[var(--accent-foreground)]' />
            <CardTitle className='text-base text-[var(--accent-foreground)]'>
              Current Session
            </CardTitle>
          </div>
          <Badge
            variant='default'
            className='bg-[var(--accent-foreground)] text-[var(--accent)]'
          >
            Active
          </Badge>
        </div>
        <CardDescription className='text-[var(--accent-foreground)]'>
          This is your current active session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SessionCard session={currentSession} isCurrentSession={true} />
      </CardContent>
    </Card>
  );
}
