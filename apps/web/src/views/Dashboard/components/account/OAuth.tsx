import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Globe, Link } from 'lucide-react';
import { implementedOAuthProviders } from './implemented-oauth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OAuth() {
  // TODO: Implement OAuth linking

  return (
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {implementedOAuthProviders.map(provider => (
            <div
              key={provider.name}
              className='flex items-center justify-between p-4 border rounded-lg'
            >
              <div className='flex items-center gap-3'>
                <FontAwesomeIcon icon={provider.icon} size='2x' />
                <div>
                  <p className='font-medium'>{provider.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    Sign in with {provider.name}
                  </p>
                </div>
              </div>
              <Button variant='outline' size='sm' onClick={() => {}}>
                <Link className='h-4 w-4 mr-2' />
                Connect
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
