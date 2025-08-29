import { useQuery } from "@tanstack/react-query";
import { getVerifiedCooperatives } from "../api/cooperative.api";
import { TCooperativeListApiResponse, VerifiedCooperative } from "../types/cooperative-list.type";

export const useVerifiedCooperativeList = (pageNumber: number, pageSize: number) => {
  return useQuery<TCooperativeListApiResponse<VerifiedCooperative>, Error>({
    queryKey: ["verifiedCooperativeList", pageNumber, pageSize],
    queryFn: () => getVerifiedCooperatives(pageNumber, pageSize),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};