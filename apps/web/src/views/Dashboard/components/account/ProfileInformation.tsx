import { AlertCircle, User } from 'lucide-react';
import { useState } from 'react';
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
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';

interface ProfileInformationProps {
  name: string;
  email: string;
  isEmailVerified: boolean;
}

export default function ProfileInformation({
  name,
  email,
  isEmailVerified,
}: ProfileInformationProps) {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isNameChanged, setIsNameChanged] = useState(false);

  const handleChange = () => {
    if (isNameChanged) {
      void handleChangeName();
    }
    if (isEmailChanged) {
      void handleChangeEmail();
    }
    if (isNameChanged || isEmailChanged) {
      showToast.info('Saving changes...');
    }
  };

  const handleChangeName = async () => {
    try {
      await authClient.updateUser({
        name: newName,
      });
      showToast.success('Name updated successfully!');
    } catch (error) {
      console.error('Failed to change name:', error);
      showToast.error('Failed to update name. Please try again.');
    } finally {
      setIsNameChanged(false);
    }
  };

  const handleChangeEmail = async () => {
    try {
      await authClient.changeEmail({
        newEmail,
        callbackURL: '/dashboard/account',
      });
      showToast.success('Email change request sent! Please check your email.');
    } catch (error) {
      console.error('Failed to change email:', error);
      showToast.error('Failed to send email change request. Please try again.');
    } finally {
      setIsEmailChanged(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Profile Information
        </CardTitle>
        <CardDescription>
          Update your personal information and profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={newName}
              placeholder='Enter your name'
              onChange={e => {
                setNewName(e.target.value);
                setIsNameChanged(e.target.value !== name);
              }}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='flex gap-2'>
              <Input
                id='email'
                type='email'
                value={newEmail}
                placeholder='Enter your email'
                onChange={e => {
                  setNewEmail(e.target.value);
                  setIsEmailChanged(e.target.value !== email);
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {(isEmailChanged || isNameChanged) && (
            <Button variant='outline' onClick={handleChange}>
              Save Changes
            </Button>
          )}
          {!isEmailVerified && (
            <Button
              variant='outline'
              onClick={() =>
                showToast.info(
                  'Email verification link sent! Please check your inbox.'
                )
              }
            >
              Verify Email
            </Button>
          )}
        </div>
        {!isEmailVerified && (
          <div className='flex items-center gap-2 text-amber-600'>
            <AlertCircle className='h-4 w-4' />
            <span className='text-sm'>Please verify your email address</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
