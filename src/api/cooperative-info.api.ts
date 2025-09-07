import { fetch, replace, store } from "@/lib/http.lib";
import { TCooperativeInfo } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/CooperativeInfo";
const BASE_POST_ENDPOINT = "/CooperativeInfo/create";

export async function getCooperativeInfoByEmail(email: string) {
  const response = await fetch<TCooperativeInfo>({
    endpoint: `CooperativeInfo/${email}`,
  });
  return response;
}

export async function createCooperativeInfo(data: TCooperativeInfo) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key] as any);
    }
  }

  const response = await store<FormData>({
    endpoint: BASE_POST_ENDPOINT,
    data: formData,
    headers: {
      // usually, you can omit content-type and let browser set it automatically for FormData
      // 'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function updateCooperativeInfo({ id, ...data }: TCooperativeInfo) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key] as any);
    }
  }

  const response = await replace<FormData>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}



