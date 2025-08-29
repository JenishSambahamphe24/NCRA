import { fetch, replace, store } from "@/lib/http.lib";
import { TCoopStrenght } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/CoopStrenght";

export async function createCooperativeStrengthInfo(data: TCoopStrenght) {
  const response = await store<TCoopStrenght>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateCooperativeStrengthInfo({
  id,
  ...data
}: TCoopStrenght) {
  const response = await replace<TCoopStrenght>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getCooperativeStrengthInfoById({ id }: { id: number }) {
  const response = await fetch<TCoopStrenght>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getCooperativeStrengthInfoByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TCoopStrenght>({
    endpoint: `${BASE_ENDPOINT}/ByCoopId/${coopId}`,
  });
  return response;
}
