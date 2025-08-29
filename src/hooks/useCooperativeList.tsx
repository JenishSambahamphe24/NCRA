import { useQuery } from "@tanstack/react-query";
import { getManageFinancialCooperativeList } from "../api/cooperative-list.api";
import {
  TCooperative,
  TCooperativeListApiResponse,
} from "../types/cooperative-list.type";

export const useManageFinancialCooperativeList = (
  pageNumber: number,
  pageSize: number,
) => {
  return useQuery<TCooperativeListApiResponse<TCooperative>, Error>({
    queryKey: ["cooperativeList", pageNumber, pageSize],
    queryFn: () => getManageFinancialCooperativeList(pageNumber, pageSize),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
