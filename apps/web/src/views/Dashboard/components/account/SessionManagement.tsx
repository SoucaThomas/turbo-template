import { useSessions } from '@/hooks/use-sessions';
import { showToast } from '@/lib/toast';
import { useSession } from '@/lib/auth-client';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorDisplay } from './ErrorDisplay';
import { NoSessionsDisplay } from './NoSessionsDisplay';
import { CurrentSessionCard } from './CurrentSessionCard';
import { OtherSessionsList } from './OtherSessionsList';
import { DangerZone } from '../billing/DangerZone';
import { RevokeOthersButton } from './RevokeOthersButton';

export default function SessionManagement() {
  const {
    sessions = [],
    loading,
    error,
    revokeSingleSession,
    revokeAllOtherSessions,
    revokeAllSessions,
    isRevoking,
  } = useSessions();
  const { data: currentSessionData } = useSession();

  const handleRevokeSession = async (token: string) => {
    const result = await revokeSingleSession(token);

    if (result.success) {
      showToast.success('Session revoked successfully');
    } else {
      showToast.error(result.error || 'Failed to revoke session');
    }
  };

  const handleRevokeOtherSessions = async () => {
    const result = await revokeAllOtherSessions();

    if (result.success) {
      showToast.success('Other sessions revoked successfully');
    } else {
      showToast.error(result.error || 'Failed to revoke other sessions');
    }
  };

  const handleRevokeAllSessions = async () => {
    const result = await revokeAllSessions();

    if (result.success) {
      showToast.success('All sessions revoked. You will be logged out.');
    } else {
      showToast.error(result.error || 'Failed to revoke all sessions');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Ensure sessions is an array
  if (!Array.isArray(sessions)) {
    return <NoSessionsDisplay />;
  }

  // Find current session by matching user ID
  const currentSession = sessions.find(
    session => session.userId === currentSessionData?.user?.id
  );

  const otherSessions = sessions.filter(session => session !== currentSession);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h4 className='font-medium'>Active Sessions</h4>
          <p className='text-sm text-[var(--muted-foreground)]'>
            Manage your active sessions across different devices
          </p>
        </div>
        {otherSessions.length > 0 && (
          <RevokeOthersButton
            onRevokeOtherSessions={() => void handleRevokeOtherSessions()}
            isRevoking={isRevoking}
          />
        )}
      </div>

      {/* Current Session */}
      {currentSession && <CurrentSessionCard currentSession={currentSession} />}

      {/* Other Sessions */}
      <OtherSessionsList
        otherSessions={otherSessions}
        onRevokeSession={token => void handleRevokeSession(token)}
        isRevoking={isRevoking}
      />

      {/* Danger Zone */}
      <DangerZone
        onRevokeAllSessions={() => void handleRevokeAllSessions()}
        isRevoking={isRevoking}
      />
    </div>
  );
}
