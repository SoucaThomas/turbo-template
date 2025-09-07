import { zodResolver } from '@hookform/resolvers/zod';
import { Shield } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';
import { changePasswordSchema } from '../../schema';
import SessionManagement from './SessionManagement';

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function Security() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    try {
      await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true,
      });

      reset();
    } catch {
      showToast.error('Error changing password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Shield className='h-5 w-5' />
          Security
        </CardTitle>
        <CardDescription>
          Manage your password and security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Password Change */}
        <div className='space-y-4'>
          <h4 className='font-medium'>Change Password</h4>
          <form
            onSubmit={handleSubmit(onSubmit) as React.FormEventHandler}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label htmlFor='current-password'>Current Password</Label>
              <Input
                id='current-password'
                type='password'
                placeholder='Enter current password'
                {...register('currentPassword')}
                className={errors.currentPassword ? 'border-red-500' : ''}
              />
              {errors.currentPassword && (
                <p className='text-sm text-red-500'>
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='new-password'>New Password</Label>
                <Input
                  id='new-password'
                  type='password'
                  placeholder='Enter new password'
                  {...register('newPassword')}
                  className={errors.newPassword ? 'border-red-500' : ''}
                />
                {errors.newPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirm-password'>Confirm New Password</Label>
                <Input
                  id='confirm-password'
                  type='password'
                  placeholder='Confirm new password'
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password requirements */}
            <div className='text-sm text-muted-foreground space-y-1'>
              <p className='font-medium'>Password requirements:</p>
              <ul className='list-disc list-inside space-y-1'>
                <li
                  className={
                    watch('newPassword')?.length >= 8 ? 'text-green-600' : ''
                  }
                >
                  At least 8 characters
                </li>
                <li
                  className={
                    watch('newPassword')?.match(/[a-z]/) ? 'text-green-600' : ''
                  }
                >
                  One lowercase letter
                </li>
                <li
                  className={
                    watch('newPassword')?.match(/[A-Z]/) ? 'text-green-600' : ''
                  }
                >
                  One uppercase letter
                </li>
                <li
                  className={
                    watch('newPassword')?.match(/\d/) ? 'text-green-600' : ''
                  }
                >
                  One number
                </li>
              </ul>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                className='min-w-[140px]'
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </div>

        {/* <Separator /> */}

        {/* Two-Factor Authentication
        <div className='space-y-4'>
          <h4 className='font-medium'>Two-Factor Authentication</h4>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-medium'>SMS Authentication</p>
              <p className='text-sm text-muted-foreground'>
                Use SMS codes for additional security
              </p>
            </div>
            <Button variant='outline' size='sm'>
              <Smartphone className='h-4 w-4 mr-2' />
              Setup
            </Button>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-medium'>Authenticator App</p>
              <p className='text-sm text-muted-foreground'>
                Use TOTP codes from authenticator apps
              </p>
            </div>
            <Button variant='outline' size='sm'>
              <Key className='h-4 w-4 mr-2' />
              Setup
            </Button>
          </div>
        </div> */}

        <Separator />

        <SessionManagement />
      </CardContent>
    </Card>
  );
}
