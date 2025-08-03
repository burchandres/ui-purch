import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavBar } from '../components/app/navbar';
import { SidebarProvider, SidebarTrigger } from '../components/base/sidebar';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
	component: () => (
		<>
			<SidebarProvider v-slot="{isMobile, state}">
				<NavBar />
				<main>
					<SidebarTrigger />
				</main>
			</SidebarProvider>
			<Outlet />
			<TanStackRouterDevtools initialIsOpen={false} />
		</>
	),
});
