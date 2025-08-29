import { fetch, replace, store } from "@/lib/http.lib";
import {
  TCooperativeInfo,
  TGetCooperativeDetailInfoByCoopIdResponse,
} from "@/types/cooperative.type";
import {
  TCooperativeListApiResponse,
  VerifiedCooperative,
} from "@/types/cooperative-list.type";

const BASE_ENDPOINT = "/CooperativeInfo";

export async function createCooperativeInfo(data: TCooperativeInfo) {
  const response = await store<TCooperativeInfo>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateCooperativeInfo(
  id: string,
  data: TCooperativeInfo,
) {
  const response = await replace<TCooperativeInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getCooperativeInfoById(id: string) {
  const response = await fetch<TCooperativeInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getCooperativeInfoByEmail(email: string) {
  const response = await fetch<TCooperativeInfo>({
    endpoint: `${BASE_ENDPOINT}/${email}`,
  });
  return response;
}

export async function getCooperativeDetailInfo(coopId: number) {
  const response = await fetch<TGetCooperativeDetailInfoByCoopIdResponse>({
    endpoint: `${BASE_ENDPOINT}/GetCooperativeDetailInfo`,
    config: {
      params: {
        coopId: coopId,
      },
    },
  });
  return response;
}

export async function verifyCooperative(coopId: number) {
  const response = await store({
    endpoint: `/admin/AdminVerify/verify/${coopId}`,
  });
  return response;
}

export async function submitCooperativeFeedback(data: {
  id: number;
  cooperativeInfoId: number;
  status: string;
  message: string;
}) {
  const response = await store({
    endpoint: "/CooperativeFeedback",
    data: data,
  });
  return response;
}

export async function getManageFinancialCoops(pageNumber = 1, pageSize = 10) {
  const response = await fetch({
    endpoint: `/DashboardReport/manage-financial-coops?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  });
  return response;
}

export async function getVerifiedCooperatives(
  pageNumber = 1,
  pageSize = 10,
): Promise<TCooperativeListApiResponse<VerifiedCooperative>> {
  const response = await fetch<
    TCooperativeListApiResponse<VerifiedCooperative>
  >({
    endpoint: `/admin/AdminVerify/verified?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  });
  return response;
}
