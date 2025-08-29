import { fetch, replace, store } from "@/lib/http.lib";
import {
  TCommitteeDetailResponse,
  TCommitteeDetail,
} from "@/types/committee.type";
import { TCommitteeMember } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/CommitteDetail";

export async function getCommitteeDetails(cooperativeId: string) {
  const response = await fetch<TCommitteeDetailResponse>({
    endpoint: `${BASE_ENDPOINT}/${cooperativeId}`,
  });
  return response;
}

export async function createCommitteeDetail(data: TCommitteeMember) {
  const response = await store<TCommitteeMember>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateCommitteeDetail({ id, ...data }: TCommitteeMember) {
  const response = await replace<TCommitteeMember>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: data,
  });
  return response;
}

export async function getCommitteeDetailById({ id }: { id: number }) {
  const response = await fetch<TCommitteeDetail[]>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getCommitteeDetailByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TCommitteeDetail[]>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}

export async function createCommitteeDetails(data: TCommitteeMember[]) {
  const response = await store<TCommitteeMember[]>({
    endpoint: `${BASE_ENDPOINT}/bulk`,
    data: data,
  });
  return response;
}

export async function updateCommitteeDetails(data: TCommitteeMember[]) {
  const response = await replace<TCommitteeMember[]>({
    endpoint: `${BASE_ENDPOINT}/bulk`,
    data: data,
  });
  return response;
}
