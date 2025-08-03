import { createFileRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/app/navbar";
import { SidebarProvider } from "@/components/base/sidebar";
import { authLoader } from "@/lib/authLoader";

// all /app/* routes will inherit this authloader
export const Route = createFileRoute("/app")({
  component: () => (
    <SidebarProvider v-slot="{isMobile, state}">
      <NavBar />
      <Outlet />
    </SidebarProvider>
  ),
  loader: authLoader,
});
