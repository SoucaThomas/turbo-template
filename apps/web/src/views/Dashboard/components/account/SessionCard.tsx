import {
  getSessionStatus,
  parseUserAgent,
  formatSessionDate,
} from '@/lib/session-utils';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Globe,
  LogOut,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import type { Session } from '@/lib/session-api';

interface SessionCardProps {
  session: Session;
  isCurrentSession: boolean;
  onRevoke?: () => void;
  isRevoking?: boolean;
}

const getDeviceIcon = (device: string) => {
  switch (device) {
    case 'Mobile':
      return <Smartphone className='h-4 w-4' />;
    case 'Tablet':
      return <Tablet className='h-4 w-4' />;
    default:
      return <Monitor className='h-4 w-4' />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <Badge
          variant='default'
          className='bg-[var(--accent)] text-[var(--accent-foreground)]'
        >
          Active
        </Badge>
      );
    case 'expiring-soon':
      return (
        <Badge
          variant='secondary'
          className='bg-[var(--secondary)] text-[var(--secondary-foreground)]'
        >
          Expiring Soon
        </Badge>
      );
    case 'expired':
      return <Badge variant='destructive'>Expired</Badge>;
    default:
      return <Badge variant='secondary'>Unknown</Badge>;
  }
};

export function SessionCard({
  session,
  isCurrentSession,
  onRevoke,
  isRevoking,
}: SessionCardProps) {
  const { browser, os, device } = parseUserAgent(session.userAgent || '');
  const status = getSessionStatus(session.expiresAt.toISOString());

  return (
    <div className='space-y-3'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          {getDeviceIcon(device)}
          <div>
            <p className='font-medium'>
              {browser} on {os}
            </p>
            <p className='text-sm text-muted-foreground'>
              {device} •{' '}
              {session.ipAddress ? `${session.ipAddress}` : 'Unknown location'}
            </p>
          </div>
        </div>
        {!isCurrentSession && onRevoke && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='sm' disabled={isRevoking}>
                <LogOut className='h-4 w-4 mr-2' />
                Sign Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign Out Device</AlertDialogTitle>
                <AlertDialogDescription>
                  This will sign out the device: {browser} on {os} ({device})
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onRevoke}>
                  Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4 text-sm'>
        <div className='flex items-center gap-2'>
          <Clock className='h-4 w-4 text-muted-foreground' />
          <span>
            Created {formatSessionDate(session.createdAt.toISOString())}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Globe className='h-4 w-4 text-muted-foreground' />
          <span>
            Last active {formatSessionDate(session.updatedAt.toISOString())}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <MapPin className='h-4 w-4 text-muted-foreground' />
          <span>
            Expires {formatSessionDate(session.expiresAt.toISOString())}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-current' />
          <span>Status: {getStatusBadge(status)}</span>
        </div>
      </div>
    </div>
  );
}
