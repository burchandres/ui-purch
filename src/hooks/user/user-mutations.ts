import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import {
	type CreateUserData,
	deleteUser,
	registerUser,
	updateUser,
} from '@/lib/api/user';

export const useRegisterUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.users.current] });
		},
	});

	return {
		register: mutation.mutate,
		registerAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		data: mutation.data,
	};
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: Partial<CreateUserData>) => updateUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.users.current] });
		},
	});

	return {
		updateUser: mutation.mutate,
		updateUserAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		data: mutation.data,
	};
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.clear();
		},
	});

	return {
		deleteUser: mutation.mutate,
		deleteUserAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
