import { createFileRoute } from '@tanstack/react-router';

import LandingPageView from '@/views/LandingPage/LandingPageView';

export const Route = createFileRoute('/')({
  component: LandingPageView,
});
