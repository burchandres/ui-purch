import { redirect } from "@tanstack/react-router";
import { checkIfLoggedIn } from "@/lib/api/user";

// acts as a gateway
export async function authLoader() {
  const loggedIn = await checkIfLoggedIn();
  console.log("li", loggedIn);
  if (!loggedIn) throw redirect({ to: "/" });
}
