import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import {
	getLinkToken,
	getUserInfo,
	login,
	logout,
} from '@/lib/api/user/endpoints';

export const useUserInfo = () => {
	const query = useQuery({
		queryKey: [queryKeys.user.info],
		queryFn: getUserInfo,
		staleTime: apiConfig.staleTimes.user,
		retry: 1,
	});

	return {
		user: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			const userKeys = Object.values(queryKeys.user);
			const budgetKeys = Object.values(queryKeys.budget);
			queryClient.invalidateQueries({
				queryKey: [...userKeys, ...budgetKeys],
			});
		},
	});

	return {
		login: mutation.mutate,
		loginAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		reset: mutation.reset,
	};
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			// console.log('successfully logged out');
			// const userKeys = Object.values(queryKeys.user);
			// const budgetKeys = Object.values(queryKeys.budget);
			// queryClient.invalidateQueries({ queryKey: [...userKeys, ...budgetKeys] });
			// queryClient.removeQueries({ queryKey: [...userKeys, ...budgetKeys] });
			queryClient.clear();
		},
	});

	return {
		logout: mutation.mutate,
		logoutAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
};

export const useLinkToken = (enabled = true) => {
	const query = useQuery({
		queryKey: [queryKeys.user.linkToken],
		queryFn: getLinkToken,
		enabled,
		// staleTime: 5 * 60 * 1000, // 5 minutes
	});

	return {
		linkToken: query.data?.linkToken,
		linkTokenData: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
	};
};
