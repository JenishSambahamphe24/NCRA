import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import CoopProfile from '@/components/profile/CoopProfile';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/coop-profile')({
  component: CoopProfilePage,
});

function CoopProfilePage() {
  return (
    <div className="min-h-full">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <CoopProfile />
      </Suspense>
    </div>
  );
}
