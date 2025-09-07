import { Mail, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';

export default function DataPrivacy() {
  const deleteUser = async () => {
    const result = await authClient.deleteUser();
    if ('data' in result && result.data?.success) {
      showToast.success('Sent deletion request to your email');
    } else {
      showToast.error(
        result.error?.message || 'Failed to send deletion request'
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Mail className='h-5 w-5' />
          Data & Privacy
        </CardTitle>
        <CardDescription>
          Manage your data and privacy settings.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-medium'>Delete Account</p>
            <p className='text-sm text-muted-foreground'>
              Permanently delete your account and all data
            </p>
          </div>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => {
              void deleteUser();
            }}
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
