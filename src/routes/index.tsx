import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api/user";
import { LandingPage } from "@/components/landing/landing-page";

// routes to dashboard if logged in, login if not
export const Route = createFileRoute("/")({
  component: () => (
    <>
      <LandingPage />
      <Outlet />
    </>
  ),
  loader: async () => {
    console.log("ok!!");
    const user = await getCurrentUser();
    console.log("user", user);
    if (user) throw redirect({ to: "/app/dashboard" });
  },
});
