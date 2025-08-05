import { redirect } from "@tanstack/react-router";
import { queryClient } from "@/lib/queryClient";
import { getCurrentUser } from "@/lib/api/user";

// acts as a gateway to inform routing loaders whether to redirect or not
export async function authLoader() {
  const res = await queryClient.fetchQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  console.log("res", res);
  if (!res || (res.detail && res.detail === "Could not validate credentials")) {
    throw redirect({ to: "/" });
  }
  return res;
}
