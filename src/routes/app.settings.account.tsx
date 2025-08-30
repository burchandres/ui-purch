import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/settings/account"!</div>;
}
