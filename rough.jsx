<Grid container spacing={2}>
    <Grid item xs={4}>
        <FormField
            control={control}
            name="cooperativeCode"
            render={({ field }) => (
                <FormItem >
                    <FormLabel>
                        Cooperative Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="Enter cooperative code" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </Grid>
    <Grid item xs={4}>
        <FormField
            control={control}
            name="fiscalYearId"
            render={({ field }) => (
                <FormItem >
                    <FormLabel>
                        Fiscal Year <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            value={field.value?.toString()}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select fiscal year" />
                            </SelectTrigger>
                            <SelectContent>
                                {fiscalYearOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value.toString()}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </Grid>
    <Grid item xs={4}>
        <FormField
            control={control}
            name="registrationNo"
            render={({ field }) => (
                <FormItem >
                    <FormLabel>
                        Registration Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="Enter registration number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </Grid>

    <Grid item xs={12} sm={6}>
        <FormField
            control={control}
            name="coopsFullNameNep"
            render={({ field }) => (
                <FormItem> {/* Remove w-96 or any fixed width classes */}
                    <FormLabel>
                        Full Cooperative Name (Nepali) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="सहकारीको पूरा नाम" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </Grid>

    <Grid item xs={12} sm={6}>
        <FormField
            control={control}
            name="coopsFullNameEng"
            render={({ field }) => (
                <FormItem> {/* Remove className="w-96" */}
                    <FormLabel>
                        Full Cooperative Name (English) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="Enter full name in English" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </Grid>
</Grid>

its parent content looks something like this



import React, { useState } from "react"; // Add useState import
import { useForm } from "react-hook-form";
import { Check, MapPin, DollarSign, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { AddressInfo } from "../forms/AddressInfo";
import { FinancialInfo } from "../forms/FinancialInfo";
import { BasicInfo } from "../forms/BasicInfo";

const steps = [
    {
        id: 'basic',
        title: 'Basic Info',
        description: 'Provide basic information about the cooperative.',
        icon: Building,
        component: BasicInfo,
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
];

const StepIndicator = ({ steps, currentStep, className }) => {
    return (
        <div className={cn("w-full py-2", className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isUpcoming = index > currentStep;

                    return (
                        <div key={step.id} className="flex items-center">
                            <div className="flex flex-col gap-1 items-center ml-1 mr-4">
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200",
                                        {
                                            "bg-blue-600 border-blue-600 text-white": isCompleted,
                                            "bg-blue-50 border-blue-600 text-blue-600": isCurrent,
                                            "bg-gray-100 border-gray-300 text-gray-400": isUpcoming,
                                        },
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        <step.icon className="w-3 h-3" />
                                    )}
                                </div>

                                {/* Step Label */}
                                <div className="hidden sm:block text-center">
                                    <p
                                        className={cn("text-xs font-medium", {
                                            "text-blue-600": isCurrent,
                                            "text-gray-900": isCompleted,
                                            "text-gray-500": isUpcoming,
                                        })}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "hidden sm:block flex-1 h-px min-w-6 mx-2 transition-all duration-200",
                                        {
                                            "bg-blue-600": isCompleted,
                                            "bg-gray-300": !isCompleted,
                                        },
                                    )}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Mobile Step Title */}
            <div className="sm:hidden text-center mt-2">
                <p className="text-xs font-medium text-blue-600">
                    {steps[currentStep].title}
                </p>
            </div>
        </div>
    );
};

const StepperHome = () => {
    const [currentStep, setCurrentStep] = useState(0);

    // Initialize form methods
    const methods = useForm({
        defaultValues: {
            // Address Info defaults
            province: "",
            district: "",
            localLevel: "",
            wardNo: "",
            houseNo: "",
            tole: "",
        },
    });

    const currentStepData = steps[currentStep];
    const CurrentStepComponent = currentStepData.component;

    const handleNext = async () => {
        const isValid = await methods.trigger();

        if (isValid) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                console.log('Form submitted!', methods.getValues());
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const onSubmit = async (data) => {
        console.log('Step data:', data);
        await handleNext();
    };

    return (
        <div className="p-3 sm:p-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
                    Cooperative Registration Form
                </h1>
                <p className="text-gray-600 text-center mb-4 text-sm">
                    Please fill out all the required information in each step
                </p>

                {/* Step Indicator */}
                <StepIndicator
                    steps={steps}
                    currentStep={currentStep}
                    className="w-full overflow-auto"
                />

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
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Render Current Step Component with methods prop */}
                                <CurrentStepComponent methods={methods} />

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
                                    <Button type="submit">
                                        {currentStep === steps.length - 1 ? 'Submit Form' : 'Next Step'}
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
export default StepperHome;

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
    Controller,
    FormProvider,
    useFormContext,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext < FormFieldContextValue > (
    {} as FormFieldContextValue,
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    className,
    ...props
}: ControllerProps<TFieldValues, TName> & { className?: string }) => {
    return (
        <div className={className}>
            <FormFieldContext.Provider value={{ name: props.name }}>
                <Controller {...props} />
            </FormFieldContext.Provider>
        </div>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext < FormItemContextValue > (
    {} as FormItemContextValue,
);

function FormItem({ className, ...props }) {
    const id = React.useId();
    return (
        <FormItemContext.Provider value={{ id }}>
            <div data-slot="form-item" className={cn("flex flex-col gap-2 w-full", className)} {...props} />
        </FormItemContext.Provider>
    );
}

function FormLabel({
    className,
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
    const { error, formItemId } = useFormField();

    return (
        <Label
            data-slot="form-label"
            data-error={!!error}
            className={cn("data-[error=true]:text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            data-slot="form-control"
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : props.children;

    if (!body) {
        return null;
    }

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn("text-destructive text-sm", className)}
            {...props}
        >
            {body}
        </p>
    );
}

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};


But the grid here is not working as expected theere is supposed to be 2 rows with 4, 4, 4 and 6, 6  widths  but it's not styled like that 