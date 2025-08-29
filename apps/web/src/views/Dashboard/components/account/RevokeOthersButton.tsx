import { Button } from '@/components/ui/button';
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
import { LogOut } from 'lucide-react';

interface RevokeOthersButtonProps {
  onRevokeOtherSessions: () => void;
  isRevoking: boolean;
}

export function RevokeOthersButton({
  onRevokeOtherSessions,
  isRevoking,
}: RevokeOthersButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='sm' disabled={isRevoking}>
          <LogOut className='h-4 w-4 mr-2' />
          Revoke Others
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke Other Sessions</AlertDialogTitle>
          <AlertDialogDescription>
            This will sign out all other devices except this one. Are you sure
            you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onRevokeOtherSessions}>
            Revoke Others
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
