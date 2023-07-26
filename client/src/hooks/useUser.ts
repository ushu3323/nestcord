import { Utils, trpc } from '../utils/trpc';

export default function useUser() {
  const profileQuery = trpc.profile.useQuery(undefined, { retry: false, retryOnMount: false });
  const authMutation = trpc.users.auth.useMutation();

  type AuthRouteInput = Exclude<typeof authMutation.variables, undefined>;
  type LoginCallback = (
    result: {
      success: true,
      error?: undefined,
    } | {
      success: false,
      error: {
        input?: Utils.InferFormattedError<AuthRouteInput>,
        message: string,
      }
    }
  ) => void;

  const login = (
    credentials: AuthRouteInput,
    callback?: LoginCallback,
  ) => authMutation.mutate(credentials, {
    onSuccess(data) {
      localStorage.setItem('token', data.token);
      profileQuery.refetch();
      if (callback) callback({ success: true });
    },
    onError(error) {
      const inputIssues = error.data?.zodError as Utils.InferFormattedError<AuthRouteInput>;
      if (callback) {
        callback({ success: false, error: { input: inputIssues, message: error.message } });
      }
    },
  });

  const logout = (callback?: () => void) => {
    localStorage.removeItem('token');
    profileQuery.remove();
    profileQuery.refetch({ fetchStatus: 'fetching' });
    if (callback) callback();
  };

  return {
    login,
    logout,
    isLoading: profileQuery.isLoading,
    isAuthenticating: authMutation.isLoading,
    user: profileQuery.data,
  };
}
