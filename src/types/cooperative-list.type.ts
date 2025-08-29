export type TCooperative = {
  coopId: number;
  coopName: string;
  registrationNo: string;
  status: "verified" | "unverified" | "registration";
  submittedDate: string;
  address: string;
  district: string;
  province: string;
  type: string;
  male: number;
  female: number;
  others: number;
  loan: number;
  share: number;
  total: number;
};

export interface VerifiedCooperative {
  coopsId: number;
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

export type TCooperativeListApiResponse<T> = {
  data: T[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};
