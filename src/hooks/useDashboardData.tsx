import { useQueries } from "@tanstack/react-query";
import {
  getMemberDistribution,
  getRegistrationTrend,
  getTotalCooperatives,
  getTotalMembers,
  getTotalShareAmount,
  getTotalShares,
} from "@/api/dashboard-report.api";

export function useDashboardData() {
  const queries = useQueries({
    queries: [
      { queryKey: ["totalCooperatives"], queryFn: getTotalCooperatives },
      { queryKey: ["totalMembers"], queryFn: getTotalMembers },
      { queryKey: ["totalShares"], queryFn: getTotalShares },
      { queryKey: ["totalShareAmount"], queryFn: getTotalShareAmount },
      { queryKey: ["memberDistribution"], queryFn: getMemberDistribution },
      { queryKey: ["registrationTrend"], queryFn: getRegistrationTrend },
    ],
  });

  const [
    totalCooperatives,
    totalMembers,
    totalShares,
    totalShareAmount,
    memberDistribution,
    registrationTrend,
  ] = queries;

  return {
    data: {
      totalCooperatives: totalCooperatives.data?.totalCooperatives,
      totalMembers: totalMembers.data?.totalMembers,
      totalShares: totalShares.data?.totalNumberOfShares,
      totalShareAmount: totalShareAmount.data?.totalShareAmount,
      maleMembers: memberDistribution.data?.male.count,
      femaleMembers: memberDistribution.data?.female.count,
      registrationTrend: registrationTrend.data?.map((item) => ({
        year: item.year,
        count: item.count,
      })),
      maleMembersPercentage: memberDistribution.data?.male.percentage,
      femaleMembersPercentage: memberDistribution.data?.female.percentage,
    },
    isLoading: queries.some((query) => query.isLoading),
    isError: queries.some((query) => query.isError),
  };
}
