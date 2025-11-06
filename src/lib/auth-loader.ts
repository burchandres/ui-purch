import { redirect } from '@tanstack/react-router';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getUserInfo } from '@/lib/api/user/endpoints';
import { queryClient } from '@/lib/queryClient';

export async function requireAuth() {
	try {
		await queryClient.fetchQuery({
			queryKey: [queryKeys.user.info],
			queryFn: getUserInfo,
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
			queryKey: [queryKeys.user.info],
			queryFn: getUserInfo,
			staleTime: apiConfig.staleTimes.checkAuth,
		});
		throw redirect({ to: '/dashboard' });
	} catch {
		return false;
	}
}
