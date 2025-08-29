import { MutationCache, QueryClient, QueryKey } from "@tanstack/react-query";
import { toast } from "sonner";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      invalidatesMultiQueries?: QueryKey[];
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error.cause === 404 || error.cause === 401 || error.cause === 403 || error.cause === 400) {
          return false;
        }
        if (failureCount >= 3) {
          return false;
        }
        return true;
      },
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess(_data, _variables, _context, mutation) {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta?.successMessage);
      }
    },
    onError(_error, _variables, _context, mutation) {
      if (mutation.meta?.errorMessage) {
        toast.error(mutation.meta?.errorMessage);
      }
    },
    onSettled(_data, _error, _variables, _context, mutation) {
      if (mutation.meta?.invalidatesQuery) {
        queryClient.invalidateQueries({ queryKey: mutation.meta?.invalidatesQuery });
      }
      if (mutation.meta?.invalidatesMultiQueries) {
        mutation.meta?.invalidatesMultiQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  }),
});

export default queryClient;