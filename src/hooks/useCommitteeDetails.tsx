import { useQuery } from "@tanstack/react-query";
import { getCommitteeDetails } from "@/api/committee-detail.api";

const QUERY_KEYS = {
  COMMITTEE_DETAILS: "committee-details",
};

export function useCommitteeDetails(cooperativeId?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMITTEE_DETAILS, cooperativeId],
    queryFn: () => getCommitteeDetails(cooperativeId!),
    enabled: !!cooperativeId,
  });
}