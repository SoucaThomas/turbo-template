import { createFileRoute } from '@tanstack/react-router';
import PricingView from '@/views/Pricing/PricingView';

export const Route = createFileRoute('/pricing')({
  component: PricingView,
});
