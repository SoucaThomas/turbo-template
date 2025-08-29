import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Trash2 } from 'lucide-react';

interface DangerZoneProps {
  onRevokeAllSessions: () => void;
  isRevoking: boolean;
}

export function DangerZone({
  onRevokeAllSessions,
  isRevoking,
}: DangerZoneProps) {
  return (
    <Card className='border-red-200'>
      <CardHeader>
        <CardTitle className='text-red-700'>Danger Zone</CardTitle>
        <CardDescription>
          These actions will sign you out of all devices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive' disabled={isRevoking}>
              <Trash2 className='h-4 w-4 mr-2' />
              Sign Out All Devices
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign Out All Devices</AlertDialogTitle>
              <AlertDialogDescription>
                This will sign you out of all devices including this one. You
                will need to sign in again. Are you sure you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onRevokeAllSessions}
                className='bg-red-600 hover:bg-red-700'
              >
                Sign Out All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
