import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/app/header';
import { Toaster } from '@/components/base/sonner';
import { queryClient } from '@/lib/queryClient';

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<div
				style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
			>
				<Header />
				<div style={{ flex: 1, overflow: 'hidden' }}>
					<Outlet />
				</div>
				<Toaster />
			</div>
		</QueryClientProvider>
	),
});
