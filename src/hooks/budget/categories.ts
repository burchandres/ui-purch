import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getCategories } from '@/lib/api/budget/endpoints';

export const useCategories = () => {
	const query = useQuery({
		queryKey: [queryKeys.budget.categories],
		queryFn: getCategories,
		staleTime: apiConfig.staleTimes.budget,
	});

	return {
		categories: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};
