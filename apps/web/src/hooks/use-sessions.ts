import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sessionApi } from '@/lib/session-api';

// Query keys for caching
export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  list: () => [...sessionKeys.lists()] as const,
};

export function useSessions() {
  const queryClient = useQueryClient();

  // Query for fetching sessions
  const {
    data: sessions = [],
    isLoading: loading,
    error,
    refetch: fetchSessions,
  } = useQuery({
    queryKey: sessionKeys.list(),
    queryFn: sessionApi.listSessions,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for revoking a single session
  const revokeSessionMutation = useMutation({
    mutationFn: sessionApi.revokeSession,
    onSuccess: () => {
      // Invalidate and refetch sessions
      void queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });

  // Mutation for revoking other sessions
  const revokeOtherSessionsMutation = useMutation({
    mutationFn: sessionApi.revokeOtherSessions,
    onSuccess: () => {
      // Invalidate and refetch sessions
      void queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });

  // Mutation for revoking all sessions
  const revokeAllSessionsMutation = useMutation({
    mutationFn: sessionApi.revokeAllSessions,
    onSuccess: () => {
      // Invalidate and refetch sessions
      void queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });

  const revokeSingleSession = async (token: string) => {
    try {
      await revokeSessionMutation.mutateAsync(token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to revoke session',
      };
    }
  };

  const revokeAllOtherSessions = async () => {
    try {
      await revokeOtherSessionsMutation.mutateAsync();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : 'Failed to revoke other sessions',
      };
    }
  };

  const revokeAllSessions = async () => {
    try {
      await revokeAllSessionsMutation.mutateAsync();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error:
          err instanceof Error ? err.message : 'Failed to revoke all sessions',
      };
    }
  };

  return {
    sessions,
    loading,
    error: error?.message || null,
    fetchSessions,
    revokeSingleSession,
    revokeAllOtherSessions,
    revokeAllSessions,
    isRevoking:
      revokeSessionMutation.isPending ||
      revokeOtherSessionsMutation.isPending ||
      revokeAllSessionsMutation.isPending,
  };
}
