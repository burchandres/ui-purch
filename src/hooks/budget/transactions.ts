import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import {
	deleteTransaction,
	getTransaction,
	getTransactions,
	updateTransaction,
} from '@/lib/api/budget/endpoints';
import type { TransactionUpdateRequest } from '@/lib/api/budget/types';

export const useTransactions = () => {
	const query = useQuery({
		queryKey: [queryKeys.budget.transactions],
		queryFn: getTransactions,
		staleTime: apiConfig.staleTimes.budget,
	});

	return {
		transactions: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};

export const useTransaction = (id: string, enabled = true) => {
	const query = useQuery({
		queryKey: [queryKeys.budget.transaction, id],
		queryFn: () => getTransaction(id),
		enabled,
		staleTime: apiConfig.staleTimes.budget,
	});

	return {
		transaction: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		isSuccess: query.isSuccess,
		refetch: query.refetch,
	};
};

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: Partial<TransactionUpdateRequest>;
		}) => updateTransaction(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.budget.transactions],
			});
			queryClient.invalidateQueries({
				queryKey: [queryKeys.budget.transaction, variables.id],
			});
		},
	});

	return {
		updateTransaction: mutation.mutate,
		updateTransactionAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		data: mutation.data,
	};
};

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (id: string) => deleteTransaction(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.budget.transactions],
			});
		},
	});

	return {
		deleteTransaction: mutation.mutate,
		deleteTransactionAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
