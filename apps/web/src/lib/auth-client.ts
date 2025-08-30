import { createAuthClient } from 'better-auth/react';
import { stripeClient } from '@better-auth/stripe/client';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL as string,
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
  ],
});

// Export session management functions for easier access
export const {
  getSession,
  useSession,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  revokeSessions,
} = authClient;

// Export the basic Better Auth types
export type { Session, User } from 'better-auth';
