import { FormProvider } from '@/context/form-context';
import { createFileRoute, useSearch, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/context/auth-context';

import StepperHome from '@/components/multi-step-form/stepper/StepperHome.jsx'

const CooperativeFormPage = () => {
  const searchParams = useSearch({ from: '/cooperative-form' });
  const email = searchParams?.email;

  if (!email) {
    return null;
  }

  return (
    <FormProvider email={email} >
      <div className="w-full mx-auto py-6">
        <StepperHome />
      </div>
    </FormProvider>
  );
};

export const Route = createFileRoute('/cooperative-form')({
  component: CooperativeFormPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: (search?.email as string) || undefined,
    }
  },
  beforeLoad: async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const store = useAuthStore.getState();
    if (!store.isHydrated) {
      let attempts = 0;
      while (!useAuthStore.getState().isHydrated && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
    }

    // Initialize auth if needed
    await useAuthStore.getState().initializeAuth();

    const { isAuthenticated, checkTokenValidity } = useAuthStore.getState();
    const isValid = isAuthenticated && checkTokenValidity();

    if (isValid) {
      throw redirect({ to: "/dashboard" });
    }
  },
})
