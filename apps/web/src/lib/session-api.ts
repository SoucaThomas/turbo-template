import { authClient } from './auth-client';

export interface Session {
  id: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

export const sessionApi = {
  // Get all sessions for the current user
  listSessions: async (): Promise<Session[]> => {
    const result = await authClient.listSessions();
    if ('data' in result && result.data) {
      return result.data;
    }
    throw new Error('Failed to fetch sessions');
  },

  // Revoke a specific session
  revokeSession: async (token: string): Promise<void> => {
    const result = await authClient.revokeSession({ token });
    if ('error' in result && result.error) {
      throw new Error(result.error.message || 'Failed to revoke session');
    }
  },

  // Revoke all other sessions except the current one
  revokeOtherSessions: async (): Promise<void> => {
    const result = await authClient.revokeOtherSessions();
    if ('error' in result && result.error) {
      throw new Error(
        result.error.message || 'Failed to revoke other sessions'
      );
    }
  },

  // Revoke all sessions
  revokeAllSessions: async (): Promise<void> => {
    const result = await authClient.revokeSessions();
    if ('error' in result && result.error) {
      throw new Error(result.error.message || 'Failed to revoke all sessions');
    }
  },
};
