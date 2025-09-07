// Shared Stripe Plans Configuration
// This package provides consistent plan definitions for both frontend and backend

export interface StripePlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: string;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Production Stripe Plans
export const StripePlans: StripePlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 5,
    priceId: 'price_1S1mayRwkivOozlppgaJXFix', // This exists in Stripe ($5/month)
    interval: 'month',
    description: 'Basic plan for individuals',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 50,
    priceId: 'price_1S1mblRwkivOozlpOmGCdNa3', // This exists in Stripe ($50/month)
    interval: 'month',
    description: 'Pro plan for power users',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Priority support'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Frontend-specific plans (without sensitive data like priceId)
export interface FrontendPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
}

export const FrontendPlans: FrontendPlan[] = StripePlans.map(plan => ({
  id: plan.id,
  name: plan.name,
  price: plan.price,
  interval: plan.interval,
  description: plan.description,
  features: plan.features,
}));

// Plan IDs as constants for better type safety
export const PLAN_IDS = {
  BASIC: 'basic',
  PRO: 'pro',
} as const;

export type PlanId = (typeof PLAN_IDS)[keyof typeof PLAN_IDS];

// Helper functions
export const getPlanById = (id: string): StripePlan | undefined => {
  return StripePlans.find(plan => plan.id === id);
};

export const getFrontendPlanById = (id: string): FrontendPlan | undefined => {
  return FrontendPlans.find(plan => plan.id === id);
};

export const getPlanByPriceId = (priceId: string): StripePlan | undefined => {
  return StripePlans.find(plan => plan.priceId === priceId);
};

// Utility functions for plan comparison
export const isUpgrade = (fromPlanId: string, toPlanId: string): boolean => {
  const fromPlan = getPlanById(fromPlanId);
  const toPlan = getPlanById(toPlanId);

  if (!fromPlan || !toPlan) return false;

  return toPlan.price > fromPlan.price;
};

export const getPriceDifference = (
  fromPlanId: string,
  toPlanId: string
): number => {
  const fromPlan = getPlanById(fromPlanId);
  const toPlan = getPlanById(toPlanId);

  if (!fromPlan || !toPlan) return 0;

  return toPlan.price - fromPlan.price;
};

export const getPlanFeatures = (planId: string): string[] => {
  const plan = getPlanById(planId);
  return plan?.features || [];
};

// Export types for better type safety
export type PlanInterval = StripePlan['interval'];
