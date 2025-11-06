import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getItems } from '@/lib/api/budget/endpoints';

export const useItems = () => {
	const query = useQuery({
		queryKey: [queryKeys.budget.items],
		queryFn: getItems,
		staleTime: apiConfig.staleTimes.budget,
	});

	return {
		items: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};
