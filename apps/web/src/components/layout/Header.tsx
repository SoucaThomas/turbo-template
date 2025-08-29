import { Link, useNavigate } from '@tanstack/react-router';
import { ModeToggle } from '@/components/mode-toggle';
import UserMenu from '../user-menu';
import { authClient } from '@/lib/auth-client';
import { Button } from '../ui/button';

interface HeaderProps {
  links: {
    label: string;
    to: string;
  }[];
}

export default function Header({ links }: HeaderProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  const handleSignIn = async () => {
    await navigate({ to: '/login', search: { form: 'signin' } });
  };

  const handleSignUp = async () => {
    await navigate({ to: '/login', search: { form: 'signup' } });
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        {/* Logo - Left Column */}
        <div className='flex items-center space-x-2'>
          <Link to='/' className='flex items-center space-x-2'>
            <div className='h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600'></div>
            <span className='font-bold text-xl'>Turbo</span>
          </Link>
        </div>

        {/* Navigation - Center Column */}
        <nav className='flex-1 flex items-center justify-center space-x-2 gap-4'>
          {links.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className='text-sm font-medium'
              activeProps={{ className: 'text-primary' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons - Right Column */}
        <div className='flex items-center space-x-3'>
          {session?.user ? (
            <UserMenu />
          ) : (
            <>
              <Button
                variant='ghost'
                size='sm'
                className='h-9 px-4 text-sm font-medium'
                onClick={() => void handleSignIn()}
              >
                Sign In
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='h-9 px-4 text-sm font-medium'
                onClick={() => void handleSignUp()}
              >
                Sign Up
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
