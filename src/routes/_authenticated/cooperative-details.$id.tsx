import CooperativeDetail from "@/components/cooperative-detail";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/cooperative-details/$id")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <div className="min-h-full">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <CooperativeDetail />
      </Suspense>
    </div>
  );
}
