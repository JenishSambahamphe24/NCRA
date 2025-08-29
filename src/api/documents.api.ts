import { fetch, replace, store } from "@/lib/http.lib";
import { TDocumentsInfo } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/UploadAODoc";

export async function createDocuments(data: TDocumentsInfo) {
  const response = await store<TDocumentsInfo>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateDocuments({ id, ...data }: TDocumentsInfo) {
  const response = await replace<TDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getDocumentsById({ id }: { id: number }) {
  const response = await fetch<TDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getDocumentsByCoopId({ coopId }: { coopId: number }) {
  const response = await fetch<TDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}
