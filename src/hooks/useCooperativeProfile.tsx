import { useQuery, useQueries } from "@tanstack/react-query";
import {
  getVerifiedCooperatives,
  getFinancialCooperativeList,
} from "@/api/cooperative-profile.api";
import {
  TVerifiedCooperativesRequest,
  TCooperativeListRequest,
} from "@/types/cooperative-profile.type";
import { getProvinceWiseSummary } from "@/api/dashboard-report.api";

export function useVerifiedCooperatives(params?: TVerifiedCooperativesRequest) {
  return useQuery({
    queryKey: ["verifiedCooperatives", params],
    queryFn: () => getVerifiedCooperatives(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAllVerifiedCooperatives() {
  // First get the first page to know total pages
  const firstPageQuery = useQuery({
    queryKey: ["verifiedCooperatives", { pageNumber: 1 }],
    queryFn: () => getVerifiedCooperatives({ pageNumber: 1 }),
    staleTime: 5 * 60 * 1000,
  });

  // Then get all other pages
  const totalPages = firstPageQuery.data?.totalPages || 1;
  const additionalPagesQueries = useQueries({
    queries: Array.from(
      { length: Math.max(0, totalPages - 1) },
      (_, index) => ({
        queryKey: ["verifiedCooperatives", { pageNumber: index + 2 }],
        queryFn: () => getVerifiedCooperatives({ pageNumber: index + 2 }),
        enabled: !!firstPageQuery.data && totalPages > 1,
        staleTime: 5 * 60 * 1000,
      }),
    ),
  });

  // Combine all data
  const allData = [
    ...(firstPageQuery.data?.data || []),
    ...additionalPagesQueries.flatMap((query) => query.data?.data || []),
  ];

  const isLoading =
    firstPageQuery.isLoading || additionalPagesQueries.some((q) => q.isLoading);
  const isError =
    firstPageQuery.isError || additionalPagesQueries.some((q) => q.isError);
  const error =
    firstPageQuery.error || additionalPagesQueries.find((q) => q.error)?.error;

  return {
    data: allData,
    isLoading,
    isError,
    error,
    totalRecords: firstPageQuery.data?.totalRecords || 0,
    totalPages,
  };
}

export function useProvinceWiseSummary() {
  return useQuery({
    queryKey: ["provinceWiseSummary"],
    queryFn: getProvinceWiseSummary,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useFinancialCooperativeList(params?: TCooperativeListRequest) {
  return useQuery({
    queryKey: ["cooperativeList", params],
    queryFn: () => getFinancialCooperativeList(params),
    staleTime: 5 * 60 * 1000,
  });
}
