import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/user';
import { apiConfig } from '@/config/api';

export const useUser = () => {
	return useQuery({
		queryKey: ['currentUser'],
		queryFn: getCurrentUser,
		staleTime: apiConfig.staleTimes.user,
	});
};
