import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api/user";
import { LandingPage } from "@/components/landing/landing-page";
import { queryClient } from "@/lib/queryClient";

// routes to dashboard if logged in, login if not
export const Route = createFileRoute("/")({
  component: () => <LandingPage />,
  loader: async () => {
    const user = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    if (user && user.detail !== "Could not validate credentials") {
      throw redirect({ to: "/app/dashboard" });
    }
    // else, stay on landing page
  },
});
