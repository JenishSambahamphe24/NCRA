import { fetch } from "@/lib/http.lib";
import {
  TVerifiedCooperativesResponse,
  TVerifiedCooperativesRequest,
  TProvinceWiseSummaryResponse,
  TCooperativeListResponse,
  TCooperativeListRequest,
} from "@/types/cooperative-profile.type";

const BASE_ENDPOINT = "/admin/AdminVerify";
const DASHBOARD_ENDPOINT = "/DashboardReport";

export async function getVerifiedCooperatives(
  params?: TVerifiedCooperativesRequest,
) {
  const searchParams = new URLSearchParams();
  if (params?.pageNumber)
    searchParams.append("pageNumber", params.pageNumber.toString());
  if (params?.pageSize)
    searchParams.append("pageSize", params.pageSize.toString());

  const endpoint = `${BASE_ENDPOINT}/verified${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const response = await fetch<TVerifiedCooperativesResponse>({ endpoint });
  return response;
}

export async function getFinancialCooperativeList(
  params?: TCooperativeListRequest,
) {
  const response = await fetch<TCooperativeListResponse>({
    endpoint: `${DASHBOARD_ENDPOINT}/financial-coop-list`,
    config: {
      params: params,
    },
  });
  return response;
}
