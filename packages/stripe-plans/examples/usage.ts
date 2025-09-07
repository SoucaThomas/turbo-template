// Example usage of the @turbo-template/stripe-plans package
// This file demonstrates how to use the package in different scenarios

import {
  FrontendPlans,
  getFrontendPlanById,
  getPlanById,
  getPlanByPriceId,
  getPlanFeatures,
  getPriceDifference,
  isUpgrade,
  PLAN_IDS,
  type PlanId,
  StripePlans,
} from '../src/index';

// ============================================================================
// BACKEND USAGE EXAMPLES
// ============================================================================

// 1. Use in Better Auth configuration
export function setupBetterAuthPlans() {
  return StripePlans.map(plan => ({
    name: plan.id,
    priceId: plan.priceId,
    // Note: No more seats management
  }));
}

// 2. Find plan by ID for server-side operations
export function getPlanForSubscription(planId: string) {
  const plan = getPlanById(planId);
  if (!plan) {
    throw new Error(`Plan not found: ${planId}`);
  }
  return plan;
}

// 3. Find plan by Stripe price ID
export function getPlanByStripePriceId(stripePriceId: string) {
  const plan = getPlanByPriceId(stripePriceId);
  if (!plan) {
    throw new Error(`Plan not found for price ID: ${stripePriceId}`);
  }
  return plan;
}

// 4. Validate plan upgrade/downgrade
export function validatePlanChange(fromPlanId: string, toPlanId: string) {
  if (fromPlanId === toPlanId) {
    throw new Error('Cannot change to the same plan');
  }

  const fromPlan = getPlanById(fromPlanId);
  const toPlan = getPlanById(toPlanId);

  if (!fromPlan || !toPlan) {
    throw new Error('Invalid plan ID');
  }

  return {
    isUpgrade: isUpgrade(fromPlanId, toPlanId),
    priceDifference: getPriceDifference(fromPlanId, toPlanId),
    fromPlan,
    toPlan,
  };
}

// ============================================================================
// FRONTEND USAGE EXAMPLES
// ============================================================================

// 1. Display plans in UI (safe for frontend - no sensitive data)
export function getPlansForDisplay() {
  return FrontendPlans.map(plan => ({
    ...plan,
    displayPrice: `$${plan.price}/month`,
    featureCount: plan.features.length,
  }));
}

// 2. Find plan for UI components
export function getPlanForUI(planId: string) {
  const plan = getFrontendPlanById(planId);
  if (!plan) {
    console.warn(`Plan not found: ${planId}`);
    return null;
  }
  return plan;
}

// 3. Compare plans for upgrade/downgrade UI
export function getPlanComparison(currentPlanId: string) {
  const currentPlan = getFrontendPlanById(currentPlanId);
  if (!currentPlan) return null;

  const otherPlans = FrontendPlans.filter(p => p.id !== currentPlanId);

  return otherPlans.map(plan => ({
    ...plan,
    isUpgrade: isUpgrade(currentPlanId, plan.id),
    priceDifference: getPriceDifference(currentPlanId, plan.id),
    actionText: isUpgrade(currentPlanId, plan.id) ? 'Upgrade' : 'Downgrade',
  }));
}

// 4. Get plan features for feature comparison
export function getPlanFeaturesForComparison(planId: string) {
  return getPlanFeatures(planId);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// 1. Check if user can access a feature
export function canAccessFeature(
  userPlanId: string,
  requiredFeature: string
): boolean {
  const plan = getPlanById(userPlanId);
  if (!plan) return false;

  return plan.features.includes(requiredFeature);
}

// 2. Get next plan for upgrade suggestions
export function getNextUpgradePlan(currentPlanId: string) {
  const currentPlan = getPlanById(currentPlanId);
  if (!currentPlan) return null;

  const upgradePlans = StripePlans.filter(
    plan => plan.price > currentPlan.price
  );

  // Return the cheapest upgrade option
  return upgradePlans.sort((a, b) => a.price - b.price)[0] || null;
}

// 3. Calculate prorated pricing for mid-cycle changes
export function calculateProratedAmount(
  fromPlanId: string,
  toPlanId: string,
  daysRemaining: number
): number {
  const fromPlan = getPlanById(fromPlanId);
  const toPlan = getPlanById(toPlanId);

  if (!fromPlan || !toPlan) return 0;

  const priceDiff = getPriceDifference(fromPlanId, toPlanId);
  const dailyRate = priceDiff / 30; // Assuming monthly billing

  return dailyRate * daysRemaining;
}

// ============================================================================
// TYPE-SAFE USAGE WITH CONSTANTS
// ============================================================================

// Use constants instead of magic strings
export function handlePlanSelection(planId: PlanId) {
  switch (planId) {
    case PLAN_IDS.BASIC:
      console.log('Selected Basic plan');
      break;
    case PLAN_IDS.PRO:
      console.log('Selected Pro plan');
      break;
    default:
      console.log('Unknown plan selected');
  }
}

// ============================================================================
// EXPORT ALL EXAMPLES FOR TESTING
// ============================================================================

export const examples = {
  setupBetterAuthPlans,
  getPlanForSubscription,
  getPlanByStripePriceId,
  validatePlanChange,
  getPlansForDisplay,
  getPlanForUI,
  getPlanComparison,
  getPlanFeaturesForComparison,
  canAccessFeature,
  getNextUpgradePlan,
  calculateProratedAmount,
  handlePlanSelection,
};
