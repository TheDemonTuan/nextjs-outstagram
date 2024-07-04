import { useQuery } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { AuthVerifyResponse, authKey, authVerify } from "@/api/auth";
import { UserResponse } from "@/api/user";
import { getToken } from "@/actions";

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
    status: authStatus,
    failureReason: authFailureReason,
  } = useQuery<ApiSuccessResponse<AuthVerifyResponse>, ApiErrorResponse, UserResponse>({
    queryKey: [authKey],
    queryFn: async () => await authVerify(),
    select: (res) => res?.data.user,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // retry: 3,
    // retryDelay: 1000,
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
    authStatus,
    authFailureReason,
    authCanUse: !authIsLoading && authIsSuccess && authData,
  };
};
