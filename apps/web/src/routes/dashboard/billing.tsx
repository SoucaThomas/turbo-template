import { createFileRoute } from '@tanstack/react-router';
import BillingView from '@/views/Dashboard/BillingView';

export const Route = createFileRoute('/dashboard/billing')({
  component: BillingView,
});
