export interface TCooperative {
  coopsId: string;
  cooperativeName: string;
  registrationNo: string;
  province: string;
  district: string;
  localLevel: string;
  maleMembers: number;
  femaleMembers: number;
  otherMembers: number;
  totalMembers: number;
}

export interface TVerifiedCooperativesResponse {
  data: TCooperative[];
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface TVerifiedCooperativesRequest {
  pageNumber?: number;
  pageSize?: number;
  province?: string;
  district?: string;
}

export interface TProvinceWiseSummary {
  sNo?: string;
  province: string;
  noOfCooperatives: number;
  maleMembers: number;
  femaleMembers: number;
  others: number;
  totalMembers: number;
  totalShares: number;
  totalShareAmount: number;
}

export type TProvinceWiseSummaryResponse = TProvinceWiseSummary[];

export interface TCooperativeListItem {
  id: number;
  coopName: string;
  cooperativeCode: string;
  phone: string;
  email: string;
  registrationNo: string;
  status: string;
  registeredDate: string;
  classification: string;
  districtName: string;
  localLevelName: string;
  addressName: string;
  maleMembers: number;
  femaleMembers: number;
  otherMembers: number;
  totalShares: number;
  totalShareAmount: number;
  loan: number;
  provinceName: string;
}

export interface TCooperativeListResponse {
  data: TCooperativeListItem[];
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface TCooperativeListRequest {
  pageNumber?: number;
  pageSize?: number;
  province?: string;
  district?: string;
}
