import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import type { UserUpdateRequest } from '@/lib/api/types';
import { registerUser, updateUser } from '@/lib/api/user';

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.info] });
    },
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
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
    data: mutation.data,
    error: mutation.error,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    updateUser: mutation.mutate,
    updateUserAsync: mutation.mutateAsync,
  };
};
