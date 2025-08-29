import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import CooperativeTableContainer from '../../components/member-list/CooperativeTableContainer';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/cooperative-list')({
  component: CooperativeListPage,
});

function CooperativeListPage() {
  return (
    <div className="min-h-full">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <CooperativeTableContainer />
      </Suspense>
    </div>
  );
}
