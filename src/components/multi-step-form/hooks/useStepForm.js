

import { useState } from 'react';
import { useForm } from 'react-hook-form';



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

