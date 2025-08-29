import { fetch } from "../lib/http.lib";
import {
  TCooperative,
  TCooperativeListApiResponse,
} from "../types/cooperative-list.type";

export const getManageFinancialCooperativeList = async (
  pageNumber: number,
  pageSize: number,
): Promise<TCooperativeListApiResponse<TCooperative>> => {
  return fetch<TCooperativeListApiResponse<TCooperative>>({
    endpoint: `/DashboardReport/manage-financial-coops`,
    config: {
      params: {
        pageNumber,
        pageSize,
      },
    },
  });
};
