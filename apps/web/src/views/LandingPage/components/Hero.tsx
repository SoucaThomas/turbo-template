import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className='relative overflow-hidden bg-background py-20 lg:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl'>
            Modern Full-Stack
            <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              {' '}
              Template
            </span>
          </h1>
          <p className='mb-8 text-xl text-muted-foreground lg:text-2xl'>
            Built with NestJS, TanStack Router, and modern React. Get started
            quickly with authentication, API integration, and a beautiful UI.
          </p>
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              size='lg'
              className='text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
              asChild
            >
              <Link to='/dashboard'>Get Started</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-lg px-8 py-6 border-2 hover:bg-muted hover:text-foreground transition-all duration-300 hover:-translate-y-1'
              asChild
            >
              <Link to='/pricing'>View Pricing</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-lg px-8 py-6 border-2 hover:bg-muted hover:text-foreground transition-all duration-300 hover:-translate-y-1'
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-0 -ml-24 -mt-24 h-96 w-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl'></div>
        <div className='absolute right-1/2 top-1/2 -mr-24 h-96 w-96 rounded-full bg-gradient-to-r from-accent/20 to-chart-2/20 blur-3xl'></div>
        <div className='absolute left-1/4 bottom-0 h-64 w-64 rounded-full bg-gradient-to-r from-chart-3/20 to-chart-4/20 blur-3xl'></div>
      </div>
    </section>
  );
}
