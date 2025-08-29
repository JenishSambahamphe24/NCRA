import { fetch, replace, store } from "@/lib/http.lib";
import { TOfficialDocumentsInfo } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/UploadRegistrationDoc";

export async function createOfficialDocuments(data: TOfficialDocumentsInfo) {
  const response = await store<TOfficialDocumentsInfo>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateOfficialDocuments({
  id,
  ...data
}: TOfficialDocumentsInfo) {
  const response = await replace<TOfficialDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getOfficialDocumentsById({ id }: { id: number }) {
  const response = await fetch<TOfficialDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getOfficialDocumentsByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TOfficialDocumentsInfo>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}
