import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api/user";

// acts as a gateway to inform routing loaders whether to redirect or not
export async function authLoader() {
  const user = await getCurrentUser();
  if (!user) throw redirect({ to: "/" });
  return { user };
}
