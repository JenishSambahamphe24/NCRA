
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useFormStore, FormDataState } from '@/store/formStore';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BasicInfoSchema,
  AddressInfoSchema,
  FinancialInfoSchema,
  CommitteeMemberSchema,
  ExecutiveMemberSchema,
  DocumentUploadSchema,
} from '@/schema/cooperative-schema';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  TCoopAddressInfo,
  TCooperativeInfo,
  TCoopStrenght,
  TCommitteeMember,
  TExecutiveMember,
  TDocumentsInfo,
  TOfficialDocumentsInfo
} from '@/types/cooperative.type';
import { TCommitteeDetail } from '@/types/committee.type';
import { getCooperativeMembersByCoopId, TCooperativeMember } from '@/api/cooperative-members.api';
import {
  createCooperativeInfo,
  getCooperativeInfoByEmail,
  updateCooperativeInfo
} from '@/api/cooperative-info.api';
import {
  createCooperativeAddressInfo,
  getCooperativeAddressInfoByCoopId,
  updateCooperativeAddressInfo
} from '@/api/cooperative-address.api';
import {
  createCooperativeStrengthInfo,
  getCooperativeStrengthInfoByCoopId,
  updateCooperativeStrengthInfo
} from '@/api/cooperative-strength.api';
import {
  createCommitteeDetails,
  getCommitteeDetailByCoopId,
  updateCommitteeDetails
} from '@/api/committee-detail.api';
import {
  createExecutiveDetails,
  getExecutiveDetailByCoopId,
  updateExecutiveDetails
} from '@/api/executive-detail.api';
import {
  uploadCooperativeMembersFile
} from '@/api/cooperative-members.api';
import {
  createDocuments,
  getDocumentsByCoopId,
  updateDocuments
} from '@/api/documents.api';
import {
  createOfficialDocuments,
  getOfficialDocumentsByCoopId,
  updateOfficialDocuments
} from '@/api/official-documents.api';
import { getFiscalYears } from '@/api/fiscal-year.api';
import { formSteps } from '@/config/formConfig';
import { TFiscalYear } from '@/types/fiscal-year.type';
export interface FormProviderProps {
  children: ReactNode;
  email: string;
}

type FormContextType = {
  currentStepId: typeof formSteps[number]['id'],

  formData: FormDataState,
  saveCurrentStep: () => Promise<void>
  fiscalYears: TFiscalYear[] | undefined
  cooperativeId: number | undefined
  isLoading: boolean;
  methods: ReturnType<typeof useForm>;
  handleNext: () => void;
  handlePrevious: () => void;
  currentStep: number;
}

const formContext = createContext<FormContextType>({ // Changed to FormContextType
  currentStepId: formSteps[0].id,
  formData: {},
  saveCurrentStep: async () => { },
  fiscalYears: undefined,
  cooperativeId: undefined,
  isLoading: false,
  methods: {} as ReturnType<typeof useForm>,
  handleNext: () => { },
  handlePrevious: () => { },
  currentStep: 0,
});

export const FormProvider = ({ children, email }: FormProviderProps) => {

  const { cooperativeId, formData, currentStepId, updateFormData, setCooperativeId, setCurrentStepId } = useFormStore();

  const getCurrentStepSchema = (): any => {
    switch (currentStepId) {
      case 'basic':
        return BasicInfoSchema;
      case 'address':
        return AddressInfoSchema;
      case 'financial':
        return FinancialInfoSchema;
      case 'committee':
        return CommitteeMemberSchema.array();
      case 'executive':
        return ExecutiveMemberSchema.array();
      case 'coopsMembers':
        return BasicInfoSchema;
      case 'documents':
        return DocumentUploadSchema;
      case 'officialDocuments':
        return DocumentUploadSchema;
      default:
        return BasicInfoSchema;
    }
  };

  const methods = useForm<FieldValues>({
    resolver: zodResolver(getCurrentStepSchema()),
    defaultValues: formData[currentStepId] || {},
  });

  useEffect(() => {
    methods.reset(formData[currentStepId] || {});
  }, [currentStepId, methods, formData]);

  const currentStep = formSteps.findIndex(step => step.id === currentStepId);

  const onSubmit = async (data: any) => {
    updateFormData(currentStepId, data);

    await saveCurrentStep();

    if (currentStep < formSteps.length - 1) {
      setCurrentStepId(formSteps[currentStep + 1].id);
    } else {
      await saveCurrentStep();
    }
  };

  const handleNext = () => {
    methods.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    if (currentStepId !== formSteps[0].id) {
      setCurrentStepId(formSteps[currentStep - 1].id);
    }
  };

  const { data: cooperativeData } = useQuery<TCooperativeInfo>({
    queryKey: ['cooperativeInfo', email],
    queryFn: () => getCooperativeInfoByEmail(email),
    enabled: !!email && currentStepId === 'basic',
  });

  const { data: cooperativeAddressData } = useQuery<TCoopAddressInfo>({
    queryKey: ['cooperativeAddressInfo', cooperativeId],
    queryFn: () => getCooperativeAddressInfoByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'address',
  });

  const { data: cooperativeStrengthData } = useQuery<TCoopStrenght>({
    queryKey: ['cooperativeStrengthInfo', cooperativeId],
    queryFn: () => getCooperativeStrengthInfoByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'financial',
  });

  const { data: committeeData } = useQuery<TCommitteeDetail[]>({
    queryKey: ['committeeDetail', cooperativeId],
    queryFn: () => getCommitteeDetailByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'committee',
  });

  const { data: executiveData } = useQuery<TExecutiveMember[]>({
    queryKey: ['executiveDetail', cooperativeId],
    queryFn: () => getExecutiveDetailByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'executive',
  });

  const { data: cooperativeMembersData } = useQuery<TCooperativeMember[]>({
    queryKey: ['cooperativeMembers', cooperativeId],
    queryFn: () => getCooperativeMembersByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'coopsMembers',
  });

  const { data: documentsData } = useQuery<TDocumentsInfo>({
    queryKey: ['documents', cooperativeId],
    queryFn: () => getDocumentsByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'documents',
  });

  const { data: officialDocumentsData } = useQuery<TOfficialDocumentsInfo>({
    queryKey: ['officialDocuments', cooperativeId],
    queryFn: () => getOfficialDocumentsByCoopId({ coopId: cooperativeId! }),
    enabled: !!cooperativeId && currentStepId === 'officialDocuments',
  });

  const { data: fiscalYears } = useQuery({
    queryKey: ['fiscalYears'],
    queryFn: getFiscalYears,
  });


  useEffect(() => {
    if (cooperativeData) {
      updateFormData("basic", cooperativeData);
      setCooperativeId(cooperativeData?.id);
    }
  }, [cooperativeData]);

  useEffect(() => {
    if (cooperativeAddressData) {
      updateFormData("address", cooperativeAddressData);
      if (currentStepId === 'address') {
        methods.reset(cooperativeAddressData);
      }
    }
  }, [cooperativeAddressData, currentStepId, methods]);

  useEffect(() => {
    if (cooperativeStrengthData) {
      updateFormData("financial", cooperativeStrengthData);
    }
  }, [cooperativeStrengthData]);

  useEffect(() => {
    if (committeeData) {
      updateFormData("committee", committeeData?.length > 1 ? committeeData : [{}]);
    } else {
      updateFormData("committee", [{}]);
    }
  }, [committeeData]);

  useEffect(() => {
    if (executiveData) {
      updateFormData("executive", executiveData);
    }
  }, [executiveData]);

  useEffect(() => {
    if (cooperativeMembersData) {
      updateFormData("coopsMembers", cooperativeMembersData);
    }
  }, [cooperativeMembersData]);

  useEffect(() => {
    if (documentsData) {
      updateFormData("documents", documentsData);
    }
  }, [documentsData]);

  useEffect(() => {
    if (officialDocumentsData) {
      updateFormData("officialDocuments", officialDocumentsData);
    }
  }, [officialDocumentsData]);

  // Mutations
  const basicInfoMutation = useMutation({
    mutationFn: (data: TCooperativeInfo) =>
      data.id ? updateCooperativeInfo(data) : createCooperativeInfo(data),
  });

  const addressInfoMutation = useMutation({
    mutationFn: (data: TCoopAddressInfo) =>
      data.id ? updateCooperativeAddressInfo(data) : createCooperativeAddressInfo(data),
  });

  const financialInfoMutation = useMutation({
    mutationFn: (data: TCoopStrenght) =>
      data.id ? updateCooperativeStrengthInfo(data) : createCooperativeStrengthInfo(data),
  });

  const committeeMutation = useMutation({
    mutationFn: (data: TCommitteeMember[]) => {
      const hasExistingData = data.some(item => item.id);
      return hasExistingData ? updateCommitteeDetails(data) : createCommitteeDetails(data);
    },
  });

  const executiveMutation = useMutation({
    mutationFn: (data: TExecutiveMember[]) => {
      const hasExistingData = data.some(item => item.id);
      return hasExistingData ? updateExecutiveDetails(data) : createExecutiveDetails(data);
    },
  });

  const documentsMutation = useMutation({
    mutationFn: (data: TDocumentsInfo) =>
      data.id ? updateDocuments(data) : createDocuments(data),
  });

  const officialDocumentsMutation = useMutation({
    mutationFn: (data: TOfficialDocumentsInfo) =>
      data.id ? updateOfficialDocuments(data) : createOfficialDocuments(data),
  });

  const memberUploadMutation = useMutation({
    mutationFn: uploadCooperativeMembersFile,
  });

  const saveCurrentStep = async () => {
    try {
      const currentStepData = methods.getValues();
      switch (currentStepId) {
        case 'basic': {
          const basicData = currentStepData as TCooperativeInfo;
          const result = await basicInfoMutation.mutateAsync(basicData);
          if (!cooperativeId && result?.id) {
            setCooperativeId(result.id);
          }
          break;
        }

        case 'address': {
          const addressData = {
            ...currentStepData as TCoopAddressInfo,
            cooperativeInfoId: cooperativeId,
          };
          await addressInfoMutation.mutateAsync(addressData);
          break;
        }

        case 'financial': {
          const financialData = {
            ...currentStepData as TCoopStrenght,
            cooperativeInfoId: cooperativeId,
          };
          await financialInfoMutation.mutateAsync(financialData);
          break;
        }

        case 'committee': {
          const committeeDataArray = (currentStepData as TCommitteeMember[]).map(member => ({
            ...member,
            cooperativeInfoId: cooperativeId,
          }));
          await committeeMutation.mutateAsync(committeeDataArray);
          break;
        }

        case 'executive': {
          const executiveDataArray = (currentStepData as TExecutiveMember[]).map(member => ({
            ...member,
            cooperativeInfoId: cooperativeId,
          }));
          await executiveMutation.mutateAsync(executiveDataArray);
          break;
        }

        case 'coopsMembers': {
          const fileData = currentStepData as { file: File };
          if (fileData.file && cooperativeId) {
            await memberUploadMutation.mutateAsync({
              cooperativeInfoId: cooperativeId,
              file: fileData.file,
            });
          }
          break;
        }

        case 'documents': {
          const documentsData = {
            ...currentStepData as TDocumentsInfo,
            cooperativeInfoId: cooperativeId,
          };
          await documentsMutation.mutateAsync(documentsData);
          break;
        }

        case 'officialDocuments': {
          const officialDocsData = {
            ...currentStepData as TOfficialDocumentsInfo,
            cooperativeInfoId: cooperativeId,
          };
          await officialDocumentsMutation.mutateAsync(officialDocsData);
          break;
        }

        default:
          console.warn(`No save handler for step: ${currentStepId}`);
      }

      console.log(`Successfully saved ${currentStepId} step`);
    } catch (error) {
      console.error(`Error saving ${currentStepId} step:`, error);
      throw error;
    }
  }

  const formContextValue: FormContextType = {
    currentStepId,
    formData,
    saveCurrentStep,
    fiscalYears,
    cooperativeId,
    isLoading: basicInfoMutation.isPending || addressInfoMutation.isPending || financialInfoMutation.isPending || committeeMutation.isPending || executiveMutation.isPending || documentsMutation.isPending || officialDocumentsMutation.isPending || memberUploadMutation.isPending,
    methods,
    handleNext,
    handlePrevious,
    currentStep,
  }
  return (
    <formContext.Provider value={formContextValue}>
      {children}
    </formContext.Provider>
  );
};


export const useFormContext = () => {
  const context = useContext(formContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};