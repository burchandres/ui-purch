import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/app/navbar";
import { SidebarProvider } from "@/components/base/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider v-slot="{isMobile, state}">
          <NavBar />
          <main />
        </SidebarProvider>
      </QueryClientProvider>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
});
