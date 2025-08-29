import { create } from "zustand";
import { formSteps } from "@/config/formConfig";

export type FormDataState = {
  [key: (typeof formSteps)[number]["id"]]: unknown;
};

interface FormState {
  cooperativeId?: number;
  formData: FormDataState;
  currentStepId: (typeof formSteps)[number]["id"];
}

interface FormActions {
  setCooperativeId: (id: number | undefined) => void;
  updateFormData: (step: keyof FormDataState, data: unknown) => void;
  setCurrentStepId: (step: (typeof formSteps)[number]["id"]) => void;
  resetFormData: (data: FormDataState) => void;
}

export const useFormStore = create<FormState & FormActions>((set) => ({
  cooperativeId: undefined,
  formData: {},
  currentStepId: formSteps[0].id,

  setCooperativeId: (id) => set({ cooperativeId: id }),
  updateFormData: (step, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [step]: data,
      },
    })),
  setCurrentStepId: (step) => set({ currentStepId: step }),
  resetFormData: (data) => set({ formData: data }),
}));
