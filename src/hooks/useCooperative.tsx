import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCooperativeDetailInfo,
  verifyCooperative,
  submitCooperativeFeedback,
  getManageFinancialCoops,
  getVerifiedCooperatives
} from '@/api/cooperative.api';

// Hook to get cooperative detail
export const useCooperativeDetail = (coopId: number) => {
  return useQuery({
    queryKey: ['cooperative-detail', coopId],
    queryFn: () => getCooperativeDetailInfo(coopId),
    enabled: !!coopId,
  });
};

// Hook to verify cooperative
export const useVerifyCooperative = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (coopId: number) => verifyCooperative(coopId),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['cooperative-detail'] });
      queryClient.invalidateQueries({ queryKey: ['manage-financial-coops'] });
    },
  });
};

// Hook to submit cooperative feedback (reject)
export const useSubmitCooperativeFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      id: number;
      cooperativeInfoId: number;
      status: string;
      message: string;
    }) => submitCooperativeFeedback(data),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['cooperative-detail'] });
      queryClient.invalidateQueries({ queryKey: ['manage-financial-coops'] });
    },
  });
};

// Hook to get manage financial cooperatives list
export const useManageFinancialCoops = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['manage-financial-coops', pageNumber, pageSize],
    queryFn: () => getManageFinancialCoops(pageNumber, pageSize),
  });
};

// Hook to get verified cooperatives list
export const useVerifiedCooperatives = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['verified-cooperatives', pageNumber, pageSize],
    queryFn: () => getVerifiedCooperatives(pageNumber, pageSize),
  });
};
