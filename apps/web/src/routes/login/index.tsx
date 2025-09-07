import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import SignInForm from '@/components/sign-in-form';
import SignUpForm from '@/components/sign-up-form';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    form: search.form as 'signin' | 'signup' | undefined,
  }),
});

function RouteComponent() {
  const { form } = Route.useSearch();
  const [showSignIn, setShowSignIn] = useState(form === 'signin');

  useEffect(() => {
    setShowSignIn(form === 'signin');
  }, [form]);

  return showSignIn ? (
    <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
  ) : (
    <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
