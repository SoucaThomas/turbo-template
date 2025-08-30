import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

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
  limits?: Record<string, number>;
  priceId?: string;
  stripeCustomerId?: string;
  referenceId: string;
  createdAt: string;
  updatedAt: string;
}

export function useBilling() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await authClient.subscription.list();

      if (error) {
        console.error('Failed to fetch subscriptions:', error);
        setError(error.message || 'Failed to fetch subscriptions');
        return;
      }

      // Transform Better Auth data to match our interface
      const transformedSubscriptions: Subscription[] = (data || []).map(
        sub => ({
          id: sub.id,
          plan: sub.plan,
          status: sub.status,
          periodStart: sub.periodStart
            ? new Date(sub.periodStart).toISOString()
            : new Date().toISOString(),
          periodEnd: sub.periodEnd
            ? new Date(sub.periodEnd).toISOString()
            : new Date().toISOString(),
          cancelAtPeriodEnd: sub.cancelAtPeriodEnd || false,
          trialStart: sub.trialStart
            ? new Date(sub.trialStart).toISOString()
            : undefined,
          trialEnd: sub.trialEnd
            ? new Date(sub.trialEnd).toISOString()
            : undefined,
          stripeSubscriptionId: sub.stripeSubscriptionId,
          limits: sub.limits,
          priceId: sub.priceId,
          stripeCustomerId: sub.stripeCustomerId,
          referenceId: sub.referenceId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      setSubscriptions(transformedSubscriptions);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const refreshAll = async () => {
    await fetchSubscriptions();
  };

  useEffect(() => {
    void fetchSubscriptions();
  }, []);

  const activeSubscription = subscriptions.find(
    sub => sub.status === 'active' || sub.status === 'trialing'
  );

  const hasActiveSubscription = !!activeSubscription;

  return {
    subscriptions,
    activeSubscription,
    hasActiveSubscription,
    loading,
    error,
    refreshAll,
    fetchSubscriptions,
  };
}
