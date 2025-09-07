import { createFileRoute } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import AccountSettingsView from '@/views/Dashboard/AccountSettingsView';

export const Route = createFileRoute('/dashboard/account')({
  loader: async () => {
    const session = await authClient.getSession();
    return { session: session.data };
  },
  component: AccountSettingsView,
});
