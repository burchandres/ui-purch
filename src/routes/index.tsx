import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api/user";
import { LandingPage } from "@/components/landing/landing-page";

// routes to dashboard if logged in, login if not
export const Route = createFileRoute("/")({
  component: () => <LandingPage />,
  loader: async () => {
    const user = await getCurrentUser();
    if (user) throw redirect({ to: "/app/dashboard" });
  },
});
