import { useQuery } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getAccounts } from '@/lib/api/budget/endpoints';

export const useAccounts = () => {
	const query = useQuery({
		queryKey: [queryKeys.budget.accounts],
		queryFn: getAccounts,
		staleTime: apiConfig.staleTimes.budget,
	});

	return {
		accounts: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};
