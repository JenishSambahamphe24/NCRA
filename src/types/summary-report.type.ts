export interface ProvinceData {
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

export interface TotalsData {
  cooperatives: number;
  male: number;
  female: number;
  others: number;
  total: number;
  totalShare: number;
  totalShareAmount: number;
}