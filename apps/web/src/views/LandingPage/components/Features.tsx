import {
  Code2,
  CreditCard,
  Database,
  Lock,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'JWT Authentication',
    description:
      'Secure authentication with JWT tokens, built-in user management and role-based access control.',
  },
  {
    icon: Zap,
    title: 'TanStack Query',
    description:
      'Powerful data fetching with automatic caching, background updates, and optimistic mutations.',
  },
  {
    icon: Code2,
    title: 'TypeScript First',
    description:
      'Full TypeScript support with generated types from your NestJS OpenAPI specification.',
  },
  {
    icon: Database,
    title: 'NestJS Backend',
    description:
      'Scalable backend with OpenAPI documentation, validation, and enterprise-grade architecture.',
  },
  {
    icon: Lock,
    title: 'Secure by Default',
    description:
      'Built-in security features including CORS, rate limiting, and input validation.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description:
      'Mobile-first design with modern UI components and dark mode support.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Integration',
    description:
      'Built-in Stripe payment processing with subscription management and billing.',
  },
];

export default function Features() {
  return (
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center mb-16'>
          <h2 className='text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6'>
            Everything You Need to Build
          </h2>
          <p className='text-xl text-muted-foreground'>
            A production-ready full-stack application with modern tools and best
            practices.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'
            >
              <CardHeader className='text-center pb-4'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
                  <feature.icon className='h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300' />
                </div>
                <CardTitle className='text-xl text-foreground'>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-base text-muted-foreground'>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
