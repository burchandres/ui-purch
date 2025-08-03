import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api/user";

export async function authLoader() {
  const user = await getCurrentUser();
  console.log("user", user);
  if (!user) throw redirect({ to: "/" });
  return { user };
}
