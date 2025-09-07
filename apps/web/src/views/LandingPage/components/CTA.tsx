import { Link } from '@tanstack/react-router';
import { ArrowRight, CreditCard, Github, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className='py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90'></div>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mb-6 text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl'>
            Ready to Build Something Amazing?
          </h2>
          <p className='mb-8 text-xl text-primary-foreground/90 lg:text-2xl'>
            Start your next project with a solid foundation. This template
            includes everything you need to ship fast.
          </p>

          <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              size='lg'
              variant='secondary'
              className='text-lg px-8 py-6 bg-background text-foreground hover:bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
              asChild
            >
              <Link to='/dashboard'>
                <Zap className='mr-2 h-5 w-5' />
                Get Started Now
                <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-lg px-8 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1'
              asChild
            >
              <Link to='/pricing'>
                <CreditCard className='mr-2 h-5 w-5' />
                View Pricing
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-lg px-8 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1'
            >
              <Github className='mr-2 h-5 w-5' />
              View on GitHub
            </Button>
          </div>

          <div className='mt-8 text-primary-foreground/80'>
            <p className='text-sm'>Free to use • Open source • MIT License</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
        <div className='absolute left-0 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
      </div>
    </section>
  );
}
