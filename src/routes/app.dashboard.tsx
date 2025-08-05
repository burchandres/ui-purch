import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")({
  component: () => <p className="m-4">Dashboard</p>,
});
