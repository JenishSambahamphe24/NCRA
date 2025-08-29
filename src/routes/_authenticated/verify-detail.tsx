import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import VerifiedCoops from '../../components/verify-detail/VerifiedCoops';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/verify-detail')({
  component: VerifyDetailPage,
});

function VerifyDetailPage() {
  return (
    <div className="min-h-full">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <VerifiedCoops />
      </Suspense>
    </div>
  );
}
