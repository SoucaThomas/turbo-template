import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';

// Define available plans for upgrade/downgrade logic
export const AVAILABLE_PLANS = [
  { id: 'basic', name: 'Basic Plan', price: 5 },
  { id: 'pro', name: 'Pro Plan', price: 50 },
];

export function useSubscriptionActions() {
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [downgradeLoading, setDowngradeLoading] = useState(false);

  const handleUpgrade = async () => {
    setUpgradeLoading(true);
    try {
      const { error } = await authClient.subscription.upgrade({
        plan: 'pro',
        successUrl: '/dashboard/billing',
        cancelUrl: '/dashboard/billing',
      });

      if (error) {
        console.error('Upgrade error:', error);
        if (
          error.message?.includes('already subscribed') ||
          error.message?.includes('no changes to confirm')
        ) {
          showToast.error(
            "You are already subscribed to the Pro plan or it's the same plan."
          );
        } else {
          showToast.error(
            `Failed to upgrade: ${error.message || 'Unknown error'}`
          );
        }
        return;
      }

      showToast.success(
        'Upgrading to Pro plan... Redirecting to Stripe checkout.'
      );
      // Better Auth will handle the redirect automatically
    } catch (err) {
      console.error('Upgrade exception:', err);
      showToast.error('Error upgrading subscription. Please try again.');
    } finally {
      setUpgradeLoading(false);
    }
  };

  const handleDowngrade = async () => {
    setDowngradeLoading(true);
    try {
      const { error } = await authClient.subscription.upgrade({
        plan: 'basic',
        successUrl: '/dashboard/billing',
        cancelUrl: '/dashboard/billing',
      });

      if (error) {
        console.error('Downgrade error:', error);
        if (
          error.message?.includes('already subscribed') ||
          error.message?.includes('no changes to confirm')
        ) {
          showToast.error(
            "You are already subscribed to the Basic plan or it's the same plan."
          );
        } else {
          showToast.error(
            `Failed to downgrade: ${error.message || 'Unknown error'}`
          );
        }
        return;
      }

      showToast.success(
        'Downgrading to Basic plan... Redirecting to Stripe checkout.'
      );
      // Better Auth will handle the redirect automatically
    } catch (err) {
      console.error('Downgrade exception:', err);
      showToast.error('Error downgrading subscription. Please try again.');
    } finally {
      setDowngradeLoading(false);
    }
  };

  const getUpgradeDowngradeOptions = (currentPlanId: string) => {
    const currentPlan = AVAILABLE_PLANS.find(p => p.id === currentPlanId);
    if (!currentPlan) return null;

    const otherPlans = AVAILABLE_PLANS.filter(p => p.id !== currentPlanId);

    return otherPlans.map(plan => {
      const isUpgrade = plan.price > currentPlan.price;
      const priceDiff = Math.abs(plan.price - currentPlan.price);

      return {
        ...plan,
        isUpgrade,
        priceDiff,
        actionText: isUpgrade ? 'Upgrade' : 'Downgrade',
        description: isUpgrade
          ? 'Get additional features and priority support'
          : 'Switch to basic features',
        priceChange: isUpgrade
          ? `+$${priceDiff}/month`
          : `-$${priceDiff}/month`,
      };
    });
  };

  return {
    upgradeLoading,
    downgradeLoading,
    handleUpgrade,
    handleDowngrade,
    getUpgradeDowngradeOptions,
  };
}
