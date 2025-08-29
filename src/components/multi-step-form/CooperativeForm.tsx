import React from 'react';
import { useFormContext } from '@/context/form-context';
import { formSteps } from '@/config/formConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StepIndicator } from './StepIndicator';
import { StepContent } from './StepContent';

import { Form } from '../ui/form';

interface CooperativeFormProps { }

const CooperativeForm: React.FC<CooperativeFormProps> = () => {
    const {
        currentStepId,
        methods,
        handleNext,
        handlePrevious,
        currentStep
    } = useFormContext();

    const currentStepData = formSteps[currentStep];
    const progress = ((currentStep + 1) / formSteps.length) * 100;

    return (
        <div className=" p-3 sm:p-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
                    Cooperative Registration Form
                </h1>
                <p className="text-gray-600 text-center mb-4 text-sm">
                    Please fill out all the required information in each step
                </p>

                {/* Progress Bar */}
                {/* <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Step {currentStep + 1} of {formSteps.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div> */}

                {/* Step Indicator */}
                <StepIndicator steps={formSteps} currentStep={currentStep} className='w-full overflow-auto' />

                {/* Form Content */}
                <Card className="mt-6">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <currentStepData.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg sm:text-xl">
                                    {currentStepData.title}
                                </CardTitle>
                                {currentStepData.description && (
                                    <CardDescription>{currentStepData.description}</CardDescription>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...methods}>
                            <form onSubmit={methods.handleSubmit(handleNext)} className="space-y-4">
                                <StepContent
                                    step={currentStepData}
                                    methods={methods}
                                />

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={currentStep === 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button type="button" onClick={handleNext}>
                                        {currentStep === formSteps.length - 1 ? 'Submit Form' : 'Next Step'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CooperativeForm;

