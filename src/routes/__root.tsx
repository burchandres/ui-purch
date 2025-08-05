import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/base/sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <main />
        <Toaster />
        <Outlet />
      </QueryClientProvider>
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
});
