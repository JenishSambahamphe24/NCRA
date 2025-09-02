

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, DollarSign, Building, Users, UserCheck, Upload } from "lucide-react";
import { AddressInfo } from "../forms/AddressInfo";
import { FinancialInfo } from "../forms/FinancialInfo";
import { BasicInfo } from "../forms/BasicInfo";
import { CommitteeForm } from "../forms/CommitteInfo";
import { ExecutiveForm } from "../forms/ExecutiveForm";
import { DocUploadForm } from "../forms/DocUploadForm";
import { OfficialDocForm } from "../forms/OfficialDocForm";
import { createCooperativeInfo } from "@/api/cooperative-info.api";


export const steps = [
    {
        id: 'basic',
        title: 'Basic Info',
        description: 'Provide basic information about the cooperative.',
        icon: Building,
        component: BasicInfo,
        apiEndPoint: createCooperativeInfo,
        fields: [
            'cooperativeCode', 'fiscalYearId', 'registrationNo', 'coopsFullNameNep',
            'coopsFullNameEng', 'contactEmail', 'contactMobilePhone', 'contactOfficePhone',
            'webUrl', 'contactPerson', 'panNo', 'registeredDateNep', 'registerDate',
            'registerYear', 'registeredFiscalYear', 'classificationOfCooperative',
            'workingArea', 'anyBranchOffice', 'numberOfBranch', 'coopsLogo',
            'registeredFederation', 'dscu', 'dcu', 'pscu', 'pcu', 'cscu', 'ncf'
        ],
        transformData: (data) => ({
            ...data,
            registerDate: data.registerDate ? new Date(data.registerDate).toISOString() : null,
            anyBranchOffice: Boolean(data.anyBranchOffice),
            registeredFederation: Boolean(data.registeredFederation),
            numberOfBranch: Number(data.numberOfBranch) || 0,
            fiscalYearId: Number(data.fiscalYearId),
            dscu: Boolean(data.dscu),
            dcu: Boolean(data.dcu),
            pscu: Boolean(data.pscu),
            pcu: Boolean(data.pcu),
            cscu: Boolean(data.cscu),
            ncf: Boolean(data.ncf),
        })
    },
    {
        id: 'address',
        title: 'Address Info',
        description: 'Enter the address details of the cooperative.',
        icon: MapPin,
        component: AddressInfo,
    },
    {
        id: 'financial',
        title: 'Financial Info',
        description: 'Provide financial details of the cooperative.',
        icon: DollarSign,
        component: FinancialInfo,
    },
    {
        id: 'committee',
        title: 'Board Committee',
        description: 'Enter the Committee details of the cooperative.',
        icon: Users,
        component: CommitteeForm,
    },
    {
        id: 'executive',
        title: 'Executive Members',
        description: 'Enter the Committee details of the cooperative.',
        icon: UserCheck,
        component: ExecutiveForm,
    },
    {
        id: 'documents',
        title: 'Registration Documents',
        description: 'Enter the Committee details of the cooperative.',
        icon: Upload,
        component: DocUploadForm,
    },
    {
        id: 'officialDocuments',
        title: 'Other official documents',
        description: 'Enter the Committee details of the cooperative.',
        icon: Upload,
        component: OfficialDocForm,
    },
];

export const useStepForm = (steps, initialData = {}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stepData, setStepData] = useState({});
    const [completedSteps, setCompletedSteps] = useState(new Set());

    const methods = useForm({
        defaultValues: {
            ...getDefaultValues(steps),
            ...initialData,
        },
    });

    const currentStepConfig = steps[currentStep];

    const handleNext = async () => {
        const fieldsToValidate = currentStepConfig.fields || Object.keys(methods.getValues());
        const isValid = await methods.trigger(fieldsToValidate);

        if (isValid) {
            await submitCurrentStep();

            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                await handleFinalSubmit();
            }
        }
    };

    const submitCurrentStep = async () => {
        if (!currentStepConfig.apiEndpoint) return;

        try {
            setIsSubmitting(true);
            const currentFormData = methods.getValues();
            const currentStepData = currentStepConfig.fields.reduce((acc, field) => {
                acc[field] = currentFormData[field];
                return acc;
            }, {});

            const transformedData = currentStepConfig.transformData
                ? currentStepConfig.transformData(currentStepData)
                : currentStepData;

            const response = await currentStepConfig.apiEndpoint(transformedData);
            setStepData(prev => ({
                ...prev,
                [currentStepConfig.id]: { ...currentStepData, response }
            }));

            setCompletedSteps(prev => new Set([...prev, currentStep]));

            console.log(`${currentStepConfig.title} submitted:`, response);
            return response;

        } catch (error) {
            console.error(`Error submitting ${currentStepConfig.title}:`, error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleFinalSubmit = async () => {
        console.log('All steps completed!', stepData);
    };

    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStep(stepIndex);
        }
    };

    return {
        currentStep,
        setCurrentStep,
        isSubmitting,
        stepData,
        completedSteps,
        methods,
        currentStepConfig,
        handleNext,
        handlePrevious,
        submitCurrentStep,
        goToStep,
    };
};

