# @turbo-template/stripe-plans

Shared Stripe plans configuration for the turbo-template monorepo.

## Overview

This package provides consistent plan definitions for both frontend and backend applications, ensuring that plan information is always in sync across the entire system. It includes comprehensive utility functions for plan management, comparison, and validation.

## Features

-   **Backend Plans**: Full plan information including Stripe price IDs for server-side operations
-   **Frontend Plans**: Safe plan information without sensitive data like price IDs
-   **Type Safety**: Full TypeScript support with proper interfaces and types
-   **Utility Functions**: Helper functions for plan comparison, validation, and feature checking
-   **Constants**: Type-safe plan ID constants to avoid magic strings
-   **No Seats Management**: Simplified individual user subscription model

## Installation

The package is automatically available in the monorepo workspace. For external projects:

```bash
npm install @turbo-template/stripe-plans
```

## Usage

### Backend (Server)

```typescript
import {
    StripePlans,
    getPlanById,
    getPlanByPriceId,
    validatePlanChange,
    PLAN_IDS,
} from "@turbo-template/stripe-plans";

// Use in Better Auth configuration
const plans = StripePlans.map((plan) => ({
    name: plan.id,
    priceId: plan.priceId,
}));

// Find specific plan
const basicPlan = getPlanById(PLAN_IDS.BASIC);
const planByPriceId = getPlanByPriceId("price_123456");

// Validate plan changes
const change = validatePlanChange("basic", "pro");
console.log(`Upgrade: ${change.isUpgrade}, Price difference: $${change.priceDifference}`);
```

### Frontend (Web)

```typescript
import {
    FrontendPlans,
    getFrontendPlanById,
    isUpgrade,
    getPriceDifference,
} from "@turbo-template/stripe-plans";

// Use in UI components
const plans = FrontendPlans;

// Find specific plan
const proPlan = getFrontendPlanById("pro");

// Compare plans
const isUpgradePlan = isUpgrade("basic", "pro");
const priceDiff = getPriceDifference("basic", "pro");
```

## API Reference

### Interfaces

#### `StripePlan`

Full plan information including sensitive data (backend only):

```typescript
interface StripePlan {
    id: string;
    name: string;
    price: number;
    priceId: string; // Stripe price ID
    interval: string;
    description: string;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}
```

#### `FrontendPlan`

Safe plan information for frontend use:

```typescript
interface FrontendPlan {
    id: string;
    name: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
}
```

### Constants

#### `PLAN_IDS`

Type-safe plan identifiers:

```typescript
export const PLAN_IDS = {
    BASIC: "basic",
    PRO: "pro",
} as const;
```

### Core Functions

#### `getPlanById(id: string): StripePlan | undefined`

Get full plan information by ID (backend use).

#### `getFrontendPlanById(id: string): FrontendPlan | undefined`

Get safe plan information by ID (frontend use).

#### `getPlanByPriceId(priceId: string): StripePlan | undefined`

Find plan by Stripe price ID.

### Utility Functions

#### `isUpgrade(fromPlanId: string, toPlanId: string): boolean`

Check if moving from one plan to another is an upgrade.

#### `getPriceDifference(fromPlanId: string, toPlanId: string): number`

Calculate the price difference between two plans.

#### `getPlanFeatures(planId: string): string[]`

Get features for a specific plan.

#### `canAccessFeature(userPlanId: string, requiredFeature: string): boolean`

Check if a user's plan includes a specific feature.

#### `getNextUpgradePlan(currentPlanId: string): StripePlan | null`

Find the next available upgrade plan.

#### `calculateProratedAmount(fromPlanId: string, toPlanId: string, daysRemaining: number): number`

Calculate prorated pricing for mid-cycle plan changes.

### Plan Structure

Each plan includes:

-   `id`: Unique identifier (e.g., 'basic', 'pro')
-   `name`: Display name (e.g., 'Basic Plan', 'Pro Plan')
-   `price`: Monthly price in USD
-   `priceId`: Stripe price ID (backend only)
-   `interval`: Billing interval (e.g., 'month')
-   `description`: Plan description
-   `features`: Array of feature strings

## Security

-   Frontend plans exclude sensitive information like Stripe price IDs
-   Backend plans include all necessary information for Stripe operations
-   Helper functions provide safe access to plan data
-   Type safety prevents accidental exposure of sensitive data

## Migration from Seats-Based System

This package replaces the previous seats-based subscription model with individual user subscriptions:

**Before (Seats):**

```typescript
limits: {
  seats: plan.seats, // Multiple users per subscription
}
```

**After (Individual):**

```typescript
// No limits needed - each user has their own subscription
```

## Development

```bash
# Build the package
npm run build

# Watch for changes
npm run dev

# Type check
npm run type-check

# Clean build artifacts
npm run clean
```

## Examples

See the `examples/usage.ts` file for comprehensive usage examples covering:

-   Better Auth integration
-   Frontend UI components
-   Plan validation and comparison
-   Feature access control
-   Prorated pricing calculations
-   Type-safe plan handling

## Contributing

When adding new plans or features:

1. Update the `StripePlans` array
2. Ensure `FrontendPlans` is automatically generated
3. Add appropriate utility functions
4. Update types and constants
5. Add examples in the usage file
6. Update this README
