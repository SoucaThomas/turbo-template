import { Link } from '@tanstack/react-router';
import { Check, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';
import { useBilling } from '@/views/Dashboard/components/billing/useBilling';

// Define the plan structure based on the server configuration
interface StripePlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: string;
  description: string;
  features: string[];
}

const plans: StripePlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 5,
    priceId: 'price_1S1mayRwkivOozlppgaJXFix', // Match server config
    interval: 'month',
    description: 'Perfect for individuals and small projects',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 50,
    priceId: 'price_1S1mblRwkivOozlpOmGCdNa3', // Match server config
    interval: 'month',
    description: 'Ideal for teams and growing businesses',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Priority support'],
  },
];

export default function PricingView() {
  const { activeSubscription, loading } = useBilling();

  const handleSubscribe = async (planId: string) => {
    // If user already has a subscription, direct them to billing dashboard
    if (activeSubscription) {
      showToast.info(
        'Please manage your subscription through your billing dashboard. ' +
          'You can change plans, update payment methods, and view billing history there.'
      );

      // Redirect to billing dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard/billing';
      }, 2000);

      return;
    }

    // For new subscriptions, proceed with normal flow
    try {
      const { error } = await authClient.subscription.upgrade({
        plan: planId,
        successUrl: `${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/dashboard`,
        cancelUrl: `${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/pricing`,
      });

      if (error) {
        console.error('Failed to create checkout session:', error.message);

        // Handle specific error cases
        if (
          error.message?.includes('already subscribed') ||
          error.code === 'YOURE_ALREADY_SUBSCRIBED_TO_THIS_PLAN' ||
          error.message?.includes('no changes to confirm') ||
          error.message?.includes('Cannot update the subscription')
        ) {
          showToast.error(
            `You're already subscribed to the ${planId} plan. You can manage your subscription in your account settings.`
          );
        } else if (
          error.message?.includes(
            'subscription update feature in the portal configuration is disabled'
          )
        ) {
          showToast.error(
            'Plan changes are managed through your billing dashboard. Please visit your account settings to modify your subscription.'
          );
        } else {
          showToast.error(
            'Failed to create checkout session. Please try again.'
          );
        }
      } else {
        showToast.success('Plan upgrade initiated! Redirecting to checkout...');
      }
      // If successful, Better Auth will automatically redirect to Stripe checkout
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Error creating checkout session:', errorMessage);

      // Handle specific error cases in catch block too
      if (
        errorMessage.includes('already subscribed') ||
        errorMessage.includes('YOURE_ALREADY_SUBSCRIBED_TO_THIS_PLAN') ||
        errorMessage.includes('no changes to confirm') ||
        errorMessage.includes('Cannot update the subscription')
      ) {
        showToast.error(
          `You're already subscribed to the ${planId} plan. You can manage your subscription in your account settings.`
        );
      } else if (
        errorMessage.includes(
          'subscription update feature in the portal configuration is disabled'
        )
      ) {
        showToast.error(
          'Plan changes are managed through your billing dashboard. Please visit your account settings to modify your subscription.'
        );
      } else {
        showToast.error('Error creating checkout session. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-foreground mb-4'>
              Simple, Transparent Pricing
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Loading pricing information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Simple, Transparent Pricing
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Choose the plan that&apos;s right for you. All plans include our
            core features with no hidden fees.
          </p>
          {activeSubscription && (
            <div className='mt-6 p-4 bg-muted/50 border border-border rounded-lg max-w-md mx-auto'>
              <p className='text-muted-foreground text-sm'>
                You currently have an active{' '}
                <strong className='text-foreground'>
                  {activeSubscription.plan}
                </strong>{' '}
                subscription. To change plans, please visit your{' '}
                <Link
                  to='/dashboard/billing'
                  className='underline hover:no-underline text-primary hover:text-primary/80'
                >
                  billing dashboard
                </Link>{' '}
                where you can manage your subscription and payment methods.
              </p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {plans.map(plan => (
            <Card key={plan.id} className='relative'>
              {plan.id === 'pro' && (
                <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90'>
                  Most Popular
                </Badge>
              )}
              <CardHeader className='text-center pb-4'>
                <CardTitle className='text-2xl font-bold text-foreground'>
                  {plan.name}
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  {plan.description}
                </CardDescription>
                <div className='mt-4'>
                  <span className='text-4xl font-bold text-foreground'>
                    ${plan.price}
                  </span>
                  <span className='text-muted-foreground'>
                    /{plan.interval}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <ul className='space-y-3'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-center gap-3'>
                      <Check className='h-5 w-5 text-primary flex-shrink-0' />
                      <span className='text-foreground'>{feature}</span>
                    </li>
                  ))}
                </ul>
                {activeSubscription?.plan === plan.id ? (
                  <div className='space-y-2'>
                    <Button disabled className='w-full mt-6' variant='outline'>
                      Current Plan
                    </Button>
                    <Button asChild variant='outline' className='w-full'>
                      <Link to='/dashboard/billing'>
                        <Settings className='h-4 w-4 mr-2' />
                        Manage Subscription
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() =>
                      activeSubscription
                        ? (window.location.href = '/dashboard/billing')
                        : void handleSubscribe(plan.id)
                    }
                    className='w-full mt-6'
                    variant={plan.id === 'pro' ? 'default' : 'outline'}
                    disabled={loading}
                  >
                    {loading
                      ? 'Loading...'
                      : activeSubscription
                        ? 'Manage in Billing'
                        : 'Get Started'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
