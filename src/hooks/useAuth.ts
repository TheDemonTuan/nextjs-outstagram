import { useQuery } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { AuthVerifyResponse, authKey, authVerify } from "@/api/auth";
import { UserResponse } from "@/api/user";

export const useAuth = () => {
  const {
    data: authData,
    error: authError,
    isSuccess: authIsSuccess,
    isError: authIsError,
    isFetching: authIsFetching,
    isPending: authIsPending,
    isLoading: authIsLoading,
    refetch: authRefetch,
    isStale: authIsStale,
  } = useQuery<ApiSuccessResponse<AuthVerifyResponse>, ApiErrorResponse, UserResponse>({
    queryKey: [authKey],
    queryFn: async () => await authVerify(),
    select: (res) => res?.data.user,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    authData,
    authError,
    authIsFetching,
    authIsPending,
    authIsLoading,
    authIsSuccess,
    authIsError,
    authRefetch,
    authIsStale,
    authCanUse: !authIsLoading && authIsSuccess && authData,
  };
};
