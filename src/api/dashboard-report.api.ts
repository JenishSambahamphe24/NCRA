import { fetch } from "@/lib/http.lib";
import { TTotalCooperativesResponse, TTotalMembersResponse, TTotalSharesResponse, TTotalShareAmountResponse, TMemberDistributionResponse, TRegistrationTrendResponse } from "@/types/dashboard-report.type";
import { ProvinceData } from '@/types/summary-report.type';
import { FinancialCooperativeListResponse } from '@/types/financial-cooperative.type';

const BASE_ENDPOINT = "/DashboardReport";

export async function getTotalCooperatives() {
  const response = await fetch<TTotalCooperativesResponse>({ endpoint: `${BASE_ENDPOINT}/total-cooperatives` });
  return response;
}

export async function getTotalMembers() {
  const response = await fetch<TTotalMembersResponse>({ endpoint: `${BASE_ENDPOINT}/total-members` });      
  return response;
}

export async function getTotalShares() {
  const response = await fetch<TTotalSharesResponse>({ endpoint: `${BASE_ENDPOINT}/total-shares` });
  return response;
}

export async function getTotalShareAmount() {
  const response = await fetch<TTotalShareAmountResponse>({ endpoint: `${BASE_ENDPOINT}/total-share-amount` });
  return response;
}

export async function getMemberDistribution() {
  const response = await fetch<TMemberDistributionResponse>({ endpoint: `${BASE_ENDPOINT}/member-distribution` });
  return response;
}

export async function getRegistrationTrend() {
  const response = await fetch<TRegistrationTrendResponse>({ endpoint: `${BASE_ENDPOINT}/registration-trend` });
  return response;
}

export async function getProvinceWiseSummary() {
  const response = await fetch<ProvinceData[]>({ endpoint: `${BASE_ENDPOINT}/province-wise-summary` });
  return response;
}

export async function getFinancialCooperativeList(pageNumber: number, pageSize: number, search?: string, district?: string) {
  let endpoint = `${BASE_ENDPOINT}/financial-coop-list?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (search) {
    endpoint += `&search=${search}`;
  }
  if (district) {
    endpoint += `&district=${district}`;
  }
  const response = await fetch<FinancialCooperativeListResponse>({ endpoint });
  return response;
}