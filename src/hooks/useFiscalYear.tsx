import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getFiscalYears,
  getFiscalYear,
  createFiscalYear,
  updateFiscalYear,
  deleteFiscalYear,
} from "@/api/fiscal-year.api";
import { TFiscalYearRequest, TUpdateFiscalYearRequest } from "@/types/fiscal-year.type";

const QUERY_KEYS = {
  FISCAL_YEARS: "fiscal-years",
  FISCAL_YEAR: "fiscal-year",
};

export function useFiscalYears() {
  return useQuery({
    queryKey: [QUERY_KEYS.FISCAL_YEARS],
    queryFn: getFiscalYears,
  });
}

export function useFiscalYear(id?: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.FISCAL_YEAR, id],
    queryFn: () => getFiscalYear(id!),
    enabled: !!id,
  });
}

export function useCreateFiscalYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFiscalYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FISCAL_YEARS] });
      toast.success("Fiscal year created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create fiscal year");
    },
  });
}

export function useUpdateFiscalYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFiscalYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FISCAL_YEARS] });
      toast.success("Fiscal year updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update fiscal year");
    },
  });
}

export function useDeleteFiscalYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFiscalYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FISCAL_YEARS] });
      toast.success("Fiscal year deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete fiscal year");
    },
  });
}

// Combined hook for easier usage
export function useFiscalYearManagement() {
  const fiscalYearsQuery = useFiscalYears();
  const createMutation = useCreateFiscalYear();
  const updateMutation = useUpdateFiscalYear();
  const deleteMutation = useDeleteFiscalYear();

  return {
    fiscalYears: fiscalYearsQuery.data || [],
    isLoading: fiscalYearsQuery.isLoading,
    error: fiscalYearsQuery.error,
    createFiscalYear: createMutation.mutate,
    updateFiscalYear: updateMutation.mutate,
    deleteFiscalYear: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    refetch: fiscalYearsQuery.refetch,
  };
}