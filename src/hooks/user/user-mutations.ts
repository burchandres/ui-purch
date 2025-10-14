import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import {
	type CreateUserData,
	deleteUser,
	registerUser,
	updateUser,
} from '@/lib/api/user';

export const useRegister = () => {
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
		onMutate: async (newUserData) => {
			await queryClient.cancelQueries({ queryKey: [queryKeys.users.current] });
			const previousUser = queryClient.getQueryData([queryKeys.users.current]);

			queryClient.setQueryData(
				[queryKeys.users.current],
				(old: Partial<CreateUserData>) => ({
					...old,
					...newUserData,
				}),
			);

			return { previousUser };
		},
		onError: (err, newUserData, context) => {
			console.error('error updating user with new data', newUserData, err);
			if (context?.previousUser) {
				queryClient.setQueryData(
					[queryKeys.users.current],
					context.previousUser,
				);
			}
		},
		onSettled: () => {
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
