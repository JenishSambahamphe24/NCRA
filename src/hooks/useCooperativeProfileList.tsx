import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVerifiedCooperatives } from "@/api/cooperative-profile.api";
import { TVerifiedCooperativesRequest, TVerifiedCooperativesResponse } from "@/types/cooperative-profile.type";

export function useCooperativeProfileList(params: TVerifiedCooperativesRequest) {
  const queryClient = useQueryClient();

  return useQuery<TVerifiedCooperativesResponse, Error>({
    queryKey: ["verifiedCooperativesList", params],
    queryFn: () => getVerifiedCooperatives(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes

  });
}