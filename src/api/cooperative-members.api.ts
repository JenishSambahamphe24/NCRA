import { fetch, replace, store } from "@/lib/http.lib";

const BASE_ENDPOINT = "/CoopMembers";

export interface TCooperativeMember {
  id?: number;
  cooperativeInfoId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  ethnicity?: string;
  email?: string;
  phoneNumber?: string;
  panNo?: string;
  nid?: string;
  province?: string;
  district?: string;
  localLevel?: string;
  wardNo?: number;
  houseNumber?: string;
  tole?: string;
  membershipDate?: string;
  shareAmount?: number;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
}

export interface TCooperativeMembersUpload {
  cooperativeInfoId: number;
  file: File;
}

export async function createCooperativeMembers(data: TCooperativeMember[]) {
  const response = await store<TCooperativeMember[]>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function updateCooperativeMembers(data: TCooperativeMember[]) {
  const response = await replace<TCooperativeMember[]>({
    endpoint: BASE_ENDPOINT,
    data: data,
  });
  return response;
}

export async function getCooperativeMembersById({ id }: { id: number }) {
  const response = await fetch<TCooperativeMember[]>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function getCooperativeMembersByCoopId({
  coopId,
}: {
  coopId: number;
}) {
  const response = await fetch<TCooperativeMember[]>({
    endpoint: `${BASE_ENDPOINT}/GetByCoopId/${coopId}`,
  });
  return response;
}

export async function uploadCooperativeMembersFile(
  data: TCooperativeMembersUpload,
) {
  const formData = new FormData();
  formData.append("cooperativeInfoId", data.cooperativeInfoId.toString());
  formData.append("file", data.file);

  const response = await store<{ message: string; importedCount: number }>({
    endpoint: `${BASE_ENDPOINT}/upload`,
    data: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
  return response;
}
