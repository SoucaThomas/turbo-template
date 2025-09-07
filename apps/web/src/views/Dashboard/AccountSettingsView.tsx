import { Bell } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Route } from '@/routes/dashboard/account';
import {
  Billing,
  DataPrivacy,
  Header,
  OAuth,
  ProfileInformation,
  Security,
} from './components/account';

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
        <Header />

        <ProfileInformation
          name={session.user.name}
          email={session.user.email}
          isEmailVerified={session.user.emailVerified}
        />

        <OAuth />

        {/* Security Settings */}
        <Security />

        {/* Billing Settings */}
        <Billing />

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
        <DataPrivacy />
      </div>
    </DashboardLayout>
  );
}
