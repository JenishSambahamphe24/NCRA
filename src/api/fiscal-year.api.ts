import { fetch, remove, replace, store } from "@/lib/http.lib";
import { TFiscalYear, TFiscalYearRequest, TFiscalYearResponse, TUpdateFiscalYearRequest } from "@/types/fiscal-year.type";

const BASE_ENDPOINT = "/FiscalYear";

export async function getFiscalYears() {
  const response = await fetch<TFiscalYear[]>({
    endpoint: BASE_ENDPOINT,
  });
  return response;
}

export async function getFiscalYear(id: number) {
  const response = await fetch<TFiscalYear>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}

export async function createFiscalYear(data: TFiscalYearRequest) {
  const response = await store<TFiscalYearResponse>({
    endpoint: BASE_ENDPOINT,
    data,
  });
  return response;
}

export async function updateFiscalYear({ id, data }: TUpdateFiscalYearRequest) {
  const response = await replace<TFiscalYearResponse>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data,
  });
  return response;
}

export async function deleteFiscalYear(id: number) {
  const response = await remove<void>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
  });
  return response;
}
