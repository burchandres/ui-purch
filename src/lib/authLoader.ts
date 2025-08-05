import { redirect } from "@tanstack/react-router";
import { queryClient } from "@/lib/queryClient";
import { getCurrentUser } from "@/lib/api/user";

// acts as a gateway to inform routing loaders whether to redirect or not
export async function authLoader() {
  const res = await queryClient.fetchQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  if (
    !res ||
    !res.details ||
    res.details === "Could not validate credentials"
  ) {
    throw redirect({ to: "/" });
  }
  return res;
}
