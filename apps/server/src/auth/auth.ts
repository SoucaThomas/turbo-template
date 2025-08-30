import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { stripe } from '@better-auth/stripe';
import Stripe from 'stripe';
import { AppConfig, StripePlans } from '../config/configuration';

export const createAuth = (
  database: PrismaClient,
  configService: ConfigService<AppConfig>
) => {
  const stripeClient = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2025-08-27.basil',
  });

  return betterAuth({
    database: prismaAdapter(database, {
      provider: 'postgresql',
    }),
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: ({ user, newEmail: _newEmail, url }) => {
          EmailService.sendEmail(
            user.email, // verification email must be sent to the current user email to approve the change
            'Approve email change',
            `Click the link to approve the change: ${url}`
          );
          return Promise.resolve();
        },
      },
      deleteUser: {
        enabled: true,
        sendDeleteAccountVerification: async ({
          user, // The user object
          url, // The auto-generated URL for deletion
        }) => {
          EmailService.sendEmail(
            user.email, // verification email must be sent to the current user email to approve the change
            'Approve account deletion',
            `Click the link to approve the deletion: ${url}`
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
        stripeClient,
        stripeWebhookSecret: configService.get('STRIPE_WEBHOOK_SECRET'),
        createCustomerOnSignUp: true,
        subscription: {
          enabled: true,
          plans: () => {
            const plans = StripePlans;
            return Promise.resolve(
              plans.map(plan => ({
                name: plan.id, // Use plan.id as the name for Better Auth
                priceId: plan.priceId,
              }))
            );
          },
        },
      }),
    ],
    oauth: {
      enabled: true,
      providers: [
        {
          id: 'google',
          type: 'oidc',
          clientId: configService.get<string>('GOOGLE_CLIENT_ID') || '',
          clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
          config: {
            issuer: 'https://accounts.google.com',
            authorizationEndpoint:
              'https://accounts.google.com/o/oauth2/v2/auth',
            tokenEndpoint: 'https://oauth2.googleapis.com/token',
            userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
          },
        },
        {
          id: 'github',
          type: 'oauth',
          clientId: configService.get<string>('GITHUB_CLIENT_ID') || '',
          clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') || '',
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

    trustedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    basePath: '/api/auth',
  });
};
