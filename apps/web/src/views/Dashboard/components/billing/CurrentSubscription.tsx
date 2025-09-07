import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';
import ActionButtons from './ActionButtons';
import NoSubscription from './NoSubscription';
import SubscriptionDetails from './SubscriptionDetails';
import SubscriptionHeader from './SubscriptionHeader';
import SubscriptionStatusDisplay from './SubscriptionStatusDisplay';
import WarningMessages from './WarningMessages';

interface Subscription {
  id: string;
  plan: string;
  status:
    | 'active'
    | 'canceled'
    | 'past_due'
    | 'unpaid'
    | 'trialing'
    | 'incomplete'
    | 'incomplete_expired'
    | 'paused';
  periodStart: string;
  periodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialStart?: string;
  trialEnd?: string;
  stripeSubscriptionId?: string;
}

interface CurrentSubscriptionProps {
  subscription: Subscription | null;
  onRefresh: () => void;
}

export default function CurrentSubscription({
  subscription,
  onRefresh: _onRefresh,
}: CurrentSubscriptionProps) {
  const [loading, setLoading] = useState(false);

  const handleBillingPortal = async () => {
    setLoading(true);
    try {
      // Check if user has a subscription
      if (!subscription?.id) {
        showToast.error('No subscription found. Please contact support.');
        return;
      }

      const { data, error } = await authClient.subscription.billingPortal({
        returnUrl: '/dashboard/billing',
      });

      if (error) {
        console.error('Stripe billing portal error:', error);

        // Handle specific Stripe configuration errors
        if (error.message?.includes('No configuration provided')) {
          showToast.error(
            'Stripe customer portal is not configured. Please contact support.'
          );
        } else {
          showToast.error(
            `Failed to access Stripe billing portal: ${error.message || 'Unknown error'}`
          );
        }
        return;
      }

      if (data?.url) {
        // Open in new tab to avoid navigation issues
        window.open(data.url, '_blank');
        showToast.success('Opening Stripe billing portal...');
      } else {
        console.error('No URL returned from Stripe billing portal');
        showToast.error('No billing portal URL received from Stripe');
      }
    } catch (err) {
      console.error('Stripe billing portal exception:', err);
      showToast.error(
        'Error accessing Stripe billing portal. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!subscription) {
    return <NoSubscription />;
  }

  const isCanceled =
    subscription.status === 'canceled' || subscription.cancelAtPeriodEnd;
  const isPastDue = subscription.status === 'past_due';

  return (
    <Card>
      <SubscriptionHeader />
      <CardContent className='space-y-4'>
        {/* Subscription Status */}
        <SubscriptionStatusDisplay
          plan={subscription.plan}
          status={subscription.status}
        />

        {/* Subscription Details */}
        <SubscriptionDetails
          periodStart={subscription.periodStart}
          periodEnd={subscription.periodEnd}
          trialEnd={subscription.trialEnd}
        />

        {/* Warning Messages */}
        <WarningMessages
          isCanceled={isCanceled}
          isPastDue={isPastDue}
          periodEnd={subscription.periodEnd}
        />

        {/* Action Buttons */}
        <ActionButtons
          onBillingPortal={() => void handleBillingPortal()}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
