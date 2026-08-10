import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiConfig } from '@/config/api';
import { queryKeys } from '@/config/query-keys';
import { getLinkToken, getUserInfo, login, logout } from '@/lib/api/user';

export const useUserInfo = () => {
  const query = useQuery({
    queryFn: getUserInfo,
    queryKey: [queryKeys.user.info],
    retry: 1,
    staleTime: apiConfig.staleTimes.user,
  });

  return {
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    user: query.data,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.info] });
    },
  });

  return {
    error: mutation.error,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    reset: mutation.reset,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      const allKeys = Object.values(queryKeys.user);
      queryClient.invalidateQueries({ queryKey: allKeys });
      queryClient.removeQueries({ queryKey: allKeys });
    },
  });

  return {
    error: mutation.error,
    isError: mutation.isError,
    isLoading: mutation.isPending,
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
  };
};

export const useLinkToken = (enabled = true) => {
  const query = useQuery({
    queryKey: [queryKeys.user.linkToken],
    queryFn: getLinkToken,
    enabled,
    // StaleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    error: query.error,
    isError: query.isError,
    isLoading: query.isLoading,
    linkToken: query.data?.linkToken,
    linkTokenData: query.data,
    refetch: query.refetch,
  };
};
