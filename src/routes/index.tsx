import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkIfLoggedIn } from "@/lib/api/user";
import { LandingPage } from "@/components/landing/landing-page";

export const Route = createFileRoute("/")({
  component: () => <LandingPage />,
  loader: async () => {
    const loggedIn = await checkIfLoggedIn();
    if (loggedIn) throw redirect({ to: "/app/dashboard" });
    // else, stay on landing page
  },
});
