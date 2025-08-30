import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { EmailService } from '../email/email.service';

export const createAuth = (database: PrismaClient) =>
  betterAuth({
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
            authorizationEndpoint:
              'https://accounts.google.com/o/oauth2/v2/auth',
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
