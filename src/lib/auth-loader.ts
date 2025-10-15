import { redirect } from '@tanstack/react-router';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getCurrentUser } from '@/lib/api/user';
import { queryClient } from '@/lib/queryClient';

export async function requireAuth() {
	try {
		await queryClient.fetchQuery({
			queryKey: [queryKeys.users.current],
			queryFn: getCurrentUser,
			staleTime: apiConfig.staleTimes.checkAuth,
		});
		return true;
	} catch {
		throw redirect({ to: '/landing' });
	}
}

export async function redirectIfAuth() {
	try {
		await queryClient.fetchQuery({
			queryKey: [queryKeys.users.current],
			queryFn: getCurrentUser,
			staleTime: apiConfig.staleTimes.checkAuth,
		});
		throw redirect({ to: '/dashboard' });
	} catch {
		return false;
	}
}
