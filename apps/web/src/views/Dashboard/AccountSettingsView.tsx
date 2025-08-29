import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Shield,
  Bell,
  Mail,
  Key,
  Smartphone,
  Globe,
  Trash2,
  Link,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Route } from '@/routes/dashboard/account';

export default function AccountSettingsView() {
  const { session } = Route.useLoaderData();

  if (!session) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-full'>
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='p-6 space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Account Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account settings, security, and preferences.
          </p>
        </div>

        {/* Profile Information */}
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
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  defaultValue={session.user.name}
                  placeholder='Enter your full name'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={session.user.email}
                  placeholder='Enter your email'
                  disabled
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Button>Save Changes</Button>
              {!session.user.emailVerified && (
                <Button variant='outline'>Verify Email</Button>
              )}
            </div>
            {!session.user.emailVerified && (
              <div className='flex items-center gap-2 text-amber-600'>
                <AlertCircle className='h-4 w-4' />
                <span className='text-sm'>
                  Please verify your email address
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* OAuth Connections */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='h-5 w-5' />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              Connect or disconnect your social media accounts for easy sign-in.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-center justify-between p-4 border rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold'>
                    G
                  </div>
                  <div>
                    <p className='font-medium'>Google</p>
                    <p className='text-sm text-muted-foreground'>
                      Sign in with Google
                    </p>
                  </div>
                </div>
                <Button variant='outline' size='sm'>
                  <Link className='h-4 w-4 mr-2' />
                  Connect
                </Button>
              </div>

              <div className='flex items-center justify-between p-4 border rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold'>
                    G
                  </div>
                  <div>
                    <p className='font-medium'>GitHub</p>
                    <p className='text-sm text-muted-foreground'>
                      Sign in with GitHub
                    </p>
                  </div>
                </div>
                <Button variant='outline' size='sm'>
                  <Link className='h-4 w-4 mr-2' />
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
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
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password'>Current Password</Label>
                  <Input
                    id='current-password'
                    type='password'
                    placeholder='Enter current password'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='new-password'>New Password</Label>
                    <Input
                      id='new-password'
                      type='password'
                      placeholder='Enter new password'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='confirm-password'>
                      Confirm New Password
                    </Label>
                    <Input
                      id='confirm-password'
                      type='password'
                      placeholder='Confirm new password'
                    />
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button>Update Password</Button>
                  <Button variant='outline'>Reset Password</Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Two-Factor Authentication */}
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
            </div>

            <Separator />

            {/* Session Management */}
            <div className='space-y-4'>
              <h4 className='font-medium'>Active Sessions</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <CheckCircle className='h-4 w-4 text-green-500' />
                    <div>
                      <p className='font-medium'>Current Session</p>
                      <p className='text-sm text-muted-foreground'>
                        {new Date().toLocaleString()} • This device
                      </p>
                    </div>
                  </div>
                  <Badge variant='secondary'>Active</Badge>
                </div>
                <div className='flex items-center justify-between p-3 border rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <XCircle className='h-4 w-4 text-gray-400' />
                    <div>
                      <p className='font-medium'>Other Sessions</p>
                      <p className='text-sm text-muted-foreground'>
                        Manage sessions on other devices
                      </p>
                    </div>
                  </div>
                  <Button variant='outline' size='sm'>
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Email Notifications</p>
                <p className='text-sm text-muted-foreground'>
                  Receive updates via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Push Notifications</p>
                <p className='text-sm text-muted-foreground'>
                  Receive push notifications in your browser
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Security Alerts</p>
                <p className='text-sm text-muted-foreground'>
                  Get notified about security events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Marketing Communications</p>
                <p className='text-sm text-muted-foreground'>
                  Receive product updates and offers
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
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
                <p className='font-medium'>Data Export</p>
                <p className='text-sm text-muted-foreground'>
                  Download a copy of your data
                </p>
              </div>
              <Button variant='outline' size='sm'>
                Export Data
              </Button>
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium'>Delete Account</p>
                <p className='text-sm text-muted-foreground'>
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant='destructive' size='sm'>
                <Trash2 className='h-4 w-4 mr-2' />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
