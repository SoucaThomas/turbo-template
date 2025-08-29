import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useNavigate } from '@tanstack/react-router';

export default function Header() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate({ to: '/login', search: { form: 'signin' } });
  };

  const handleSignUp = () => {
    navigate({ to: '/login', search: { form: 'signup' } });
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

        {/* Action Buttons - Right Column */}
        <div className='flex items-center space-x-3 justify-end flex-1'>
          <Button
            variant='ghost'
            size='sm'
            className='h-9 px-4 text-sm font-medium'
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='h-9 px-4 text-sm font-medium'
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
