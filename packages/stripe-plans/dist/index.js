"use strict";
// Shared Stripe Plans Configuration
// This package provides consistent plan definitions for both frontend and backend
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanFeatures = exports.getPriceDifference = exports.isUpgrade = exports.getPlanByPriceId = exports.getFrontendPlanById = exports.getPlanById = exports.PLAN_IDS = exports.FrontendPlans = exports.StripePlans = void 0;
// Production Stripe Plans
exports.StripePlans = [
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
exports.FrontendPlans = exports.StripePlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    interval: plan.interval,
    description: plan.description,
    features: plan.features,
}));
// Plan IDs as constants for better type safety
exports.PLAN_IDS = {
    BASIC: 'basic',
    PRO: 'pro',
};
// Helper functions
const getPlanById = (id) => {
    return exports.StripePlans.find(plan => plan.id === id);
};
exports.getPlanById = getPlanById;
const getFrontendPlanById = (id) => {
    return exports.FrontendPlans.find(plan => plan.id === id);
};
exports.getFrontendPlanById = getFrontendPlanById;
const getPlanByPriceId = (priceId) => {
    return exports.StripePlans.find(plan => plan.priceId === priceId);
};
exports.getPlanByPriceId = getPlanByPriceId;
// Utility functions for plan comparison
const isUpgrade = (fromPlanId, toPlanId) => {
    const fromPlan = (0, exports.getPlanById)(fromPlanId);
    const toPlan = (0, exports.getPlanById)(toPlanId);
    if (!fromPlan || !toPlan)
        return false;
    return toPlan.price > fromPlan.price;
};
exports.isUpgrade = isUpgrade;
const getPriceDifference = (fromPlanId, toPlanId) => {
    const fromPlan = (0, exports.getPlanById)(fromPlanId);
    const toPlan = (0, exports.getPlanById)(toPlanId);
    if (!fromPlan || !toPlan)
        return 0;
    return toPlan.price - fromPlan.price;
};
exports.getPriceDifference = getPriceDifference;
const getPlanFeatures = (planId) => {
    const plan = (0, exports.getPlanById)(planId);
    return plan?.features || [];
};
exports.getPlanFeatures = getPlanFeatures;
//# sourceMappingURL=index.js.map