import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import {
	getCurrentUser,
	getLinkToken,
	login,
	logout,
	syncBankAccounts,
	verifyAuth,
} from '@/lib/api/user';

export const useUser = () => {
	const query = useQuery({
		queryKey: [queryKeys.users.current],
		queryFn: getCurrentUser,
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

export const useVerifyAuth = () => {
	const mutation = useMutation({
		mutationFn: verifyAuth,
	});

	return {
		verifyAuth: mutation.mutate,
		verifyAuthAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.users.current] });
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
			const allKeys = Object.values(queryKeys.users);
			queryClient.invalidateQueries({ queryKey: allKeys });
			queryClient.removeQueries({ queryKey: allKeys });
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
		queryKey: [queryKeys.users.linkToken],
		queryFn: getLinkToken,
		enabled,
		// staleTime: 5 * 60 * 1000, // 5 minutes
	});

	return {
		linkToken: query.data?.link_token,
		linkTokenData: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
	};
};

export const useSyncBankAccounts = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: syncBankAccounts,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.users.current] });
		},
	});

	return {
		syncBankAccounts: mutation.mutate,
		syncBankAccountsAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
