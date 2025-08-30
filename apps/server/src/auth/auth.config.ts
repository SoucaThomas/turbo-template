import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { stripe } from '@better-auth/stripe';
import Stripe from 'stripe';

// Create a temporary Prisma client for CLI usage
const tempDatabase = new PrismaClient();

// Create a default auth instance for CLI usage
const auth = betterAuth({
  database: prismaAdapter(tempDatabase, {
    provider: 'postgresql',
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: ({ user, newEmail: _newEmail, url }) => {
        // Placeholder for CLI - will be overridden in actual usage
        console.log(
          `Email change verification: ${url}, ${JSON.stringify(user)}`
        );
        return Promise.resolve();
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        // Placeholder for CLI - will be overridden in actual usage
        console.log(
          `Account deletion verification: ${url}, ${JSON.stringify(user)}`
        );
        return Promise.resolve();
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendVerificationEmail: true,
    sendWelcomeEmail: true,
    sendPasswordChangedEmail: true,
    sendPasswordResetEmail: true,
  },
  plugins: [
    stripe({
      stripeClient: new Stripe(
        process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
        {
          apiVersion: '2025-08-27.basil',
        }
      ),
      stripeWebhookSecret:
        process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
      createCustomerOnSignUp: true,
    }),
  ],
  oauth: {
    enabled: true,
    providers: [
      {
        id: 'google',
        type: 'oidc',
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        config: {
          issuer: 'https://accounts.google.com',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
          tokenEndpoint: 'https://oauth2.googleapis.com/token',
          userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        },
      },
      {
        id: 'github',
        type: 'oauth',
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        config: {
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          tokenEndpoint: 'https://github.com/login/oauth/access_token',
          userinfoEndpoint: 'https://api.github.com/user',
        },
      },
    ],
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    generateId: () => crypto.randomUUID(),
  },

  trustedOrigins: ['http://localhost:3000'],
  basePath: '/api/auth',
});

export { auth };
