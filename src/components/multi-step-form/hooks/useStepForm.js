

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useStepForm = (steps, initialData = {}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stepData, setStepData] = useState({});

    const methods = useForm({
        defaultValues: {
            ...getDefaultValues(steps),
            ...initialData,
        },
    });

    const currentStepConfig = steps[currentStep];

    const handleNext = async () => {
        const isValid = await methods.trigger(currentStepConfig.fields);

        if (isValid) {
            const currentFormData = methods.getValues();
            const currentStepData = currentStepConfig.fields.reduce((acc, field) => {
                acc[field] = currentFormData[field];
                return acc;
            }, {});

            setStepData(prev => ({
                ...prev,
                [currentStepConfig.id]: currentStepData
            }));

            if (currentStepConfig.apiEndpoint) {
                await handleStepSubmit(currentStepConfig, currentStepData);
            }

            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                await handleFinalSubmit();
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStepSubmit = async (stepConfig, data) => {
        try {
            setIsSubmitting(true);
            const response = await stepConfig.apiEndpoint(data);
            console.log(`${stepConfig.title} submitted:`, response);

            return response;
        } catch (error) {
            console.error(`Error submitting ${stepConfig.title}:`, error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalSubmit = async () => {
        console.log('All steps completed!', stepData);
    };

    return {
        currentStep,
        setCurrentStep,
        isSubmitting,
        stepData,
        methods,
        currentStepConfig,
        handleNext,
        handlePrevious,
        handleStepSubmit,
    };
};

const getDefaultValues = (steps) => {
    return steps.reduce((acc, step) => {
        step.fields?.forEach(field => {
            acc[field] = getFieldDefaultValue(field);
        });
        return acc;
    }, {});
};

const getFieldDefaultValue = (fieldName) => {
    if (fieldName.includes('Date')) return '';
    if (fieldName.includes('Phone')) return '';
    if (fieldName.includes('Email')) return '';
    if (fieldName.includes('Id') || fieldName.includes('No')) return '';
    if (fieldName.includes('Branch') || fieldName.includes('number')) return 0;
    if (fieldName.includes('any') || fieldName.includes('registered') || fieldName.toLowerCase().includes('dcu') || fieldName.toLowerCase().includes('scu')) return false;
    return '';
};