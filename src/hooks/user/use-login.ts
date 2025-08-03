import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api/user";

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
