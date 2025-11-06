import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { registerUser, updateUser } from '@/lib/api/user/endpoints';
import type { UserUpdateRequest } from '@/lib/api/user/types';

export const useRegisterUser = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.user.info] });
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
		mutationFn: (data: UserUpdateRequest) => updateUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.user.info] });
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
