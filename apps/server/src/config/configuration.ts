export interface AppConfig {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  PORT: number;
  NODE_ENV: string;
}

export default (): AppConfig => ({
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  PORT: parseInt(process.env.PORT || '9095', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
});

interface StripePlan {
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
