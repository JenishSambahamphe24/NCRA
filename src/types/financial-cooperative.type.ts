export interface FinancialCooperativeData {
  id: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  registrationNo: string;
  status: string;
  registeredDate: string;
  classification: string;
  district: string;
  localLevel: string;
  address: string;
  members: {
    male: number;
    female: number;
    others: number;
  };
  totalShare: number;
  totalShareAmount: number;
  province?: string;
  loan?: number;
  share?: number;
}

export interface FinancialCooperativeListResponse {
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  data: FinancialCooperativeData[];
}