import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/app/header';
import { Toaster } from '@/components/base/sonner';
import { queryClient } from '@/lib/queryClient';

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Outlet />
			<Toaster />
		</QueryClientProvider>
	),
});
