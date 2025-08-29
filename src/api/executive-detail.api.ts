import { fetch, replace, store } from "@/lib/http.lib";
import { TExecutiveMember } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/ExecutiveDetail";

export async function createExecutiveDetail(data: TExecutiveMember) {
  const response = await store<TExecutiveMember>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateExecutiveDetail({ id, ...data }: TExecutiveMember) {
  const response = await replace<TExecutiveMember>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getExecutiveDetailById({ id }: { id: number }) {
  const response = await fetch<TExecutiveMember[]>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getExecutiveDetailByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TExecutiveMember[]>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}

export async function createExecutiveDetails(data: TExecutiveMember[]) {
  const response = await store<TExecutiveMember[]>({
    endpoint: `${BASE_ENDPOINT}/bulk`,
    data: data,
  });
  return response;
}

export async function updateExecutiveDetails(data: TExecutiveMember[]) {
  const response = await replace<TExecutiveMember[]>({
    endpoint: `${BASE_ENDPOINT}/bulk`,
    data: data,
  });
  return response;
}
