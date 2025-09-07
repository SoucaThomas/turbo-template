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
export declare const StripePlans: StripePlan[];
export interface FrontendPlan {
    id: string;
    name: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
}
export declare const FrontendPlans: FrontendPlan[];
export declare const PLAN_IDS: {
    readonly BASIC: "basic";
    readonly PRO: "pro";
};
export type PlanId = (typeof PLAN_IDS)[keyof typeof PLAN_IDS];
export declare const getPlanById: (id: string) => StripePlan | undefined;
export declare const getFrontendPlanById: (id: string) => FrontendPlan | undefined;
export declare const getPlanByPriceId: (priceId: string) => StripePlan | undefined;
export declare const isUpgrade: (fromPlanId: string, toPlanId: string) => boolean;
export declare const getPriceDifference: (fromPlanId: string, toPlanId: string) => number;
export declare const getPlanFeatures: (planId: string) => string[];
export type PlanInterval = StripePlan['interval'];
//# sourceMappingURL=index.d.ts.map