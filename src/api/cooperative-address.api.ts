import { fetch, replace, store } from "@/lib/http.lib";
import { TCoopAddressInfo } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/CoopAddressInfo";

export async function createCooperativeAddressInfo(data: TCoopAddressInfo) {
  const response = await store<TCoopAddressInfo>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateCooperativeAddressInfo({
  id,
  ...data
}: TCoopAddressInfo) {
  const response = await replace<TCoopAddressInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getCooperativeAddressInfoById({ id }: { id: number }) {
  const response = await fetch<TCoopAddressInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}
export async function getCooperativeAddressInfoByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TCoopAddressInfo>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}
