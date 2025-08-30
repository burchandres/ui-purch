import { StickyHeader } from "@/components/app/sticky-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")({
  component: () => (
    <StickyHeader>
      <span className="logo-text font-bold text-xl mb-1 ml-2">Dashboard</span>
    </StickyHeader>
  ),
});
