import { useCallback } from "react";

export const steps = [
  {
    id: 'basic',
    title: 'Basic Info',
    description: 'Provide basic information about the cooperative.',
    icon: Building,
    component: BasicInfo,
  },
  {
    id: 'committee',
    title: 'Committee',
    description: 'Enter the Committee details of the cooperative.',
    icon: User2,
    component: CommitteeForm,
  },
  {
    id: 'address',
    title: 'Address Info',
    description: 'Enter the address details of the cooperative.',
    icon: MapPin,
    component: AddressInfo,
  },
  {
    id: 'officialDocuments',
    title: 'Other details',
    description: 'Enter the details of the cooperative.',
    icon: Upload,
    component: OfficialDocForm,
  },
  {
    id: 'documents',
    title: 'Registration Documents',
    description: 'Enter the Committee details of the cooperative.',
    icon: Upload,
    component: DocUploadForm,
  },

  {
    id: 'executive',
    title: 'Executive Members',
    description: 'Enter the executive details of the cooperative.',
    icon: UserCheck,
    component: ExecutiveForm,
  },
  {
    id: 'financial',
    title: 'Financial Info',
    description: 'Provide financial details of the cooperative.',
    icon: DollarSign,
    component: FinancialInfo,
  },
  {
    id: 'coopsMember',
    title: 'Cooperative member',
    description: 'Upload cooperative member.',
    icon: Users,
    component: OfficialDocForm,
  },
];
const StepIndicator = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("w-full py-2", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
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
                <div className="hidden sm:block text-center mt-1">
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

              {/* Connector Line - Now properly fills space between icons */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block flex-1 px-4">
                  <div
                    className={cn(
                      "h-[2px] w-full transition-all duration-200",
                      {
                        "bg-blue-600": isCompleted,
                        "bg-gray-300": !isCompleted,
                      },
                    )}
                  />
                </div>
              )}
            </React.Fragment>
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

  const methods = useForm({
    defaultValues: {
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

  const handleNext = useCallback(() => {
    console.log('handleNext called, current step:', currentStep);
    if (currentStep < steps.length - 1) {
      console.log('Moving to next step:', currentStep + 1);
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  return (
    <div className="p-3 sm:p-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
          Cooperative Registration Form
        </h1>
        <p className="text-gray-600 text-center mb-4 text-sm">
          Please fill out all the required information in each step
        </p>

        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          className="w-full overflow-auto"
        />

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
              <CurrentStepComponent
                methods={methods}
                currentStep={currentStep}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isLastStep={currentStep === steps.length - 1}
                isFirstStep={currentStep === 0}
              />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};



export const BasicInfo = ({
  email,
  methods,
  onNext,
  onPrevious,
  isLastStep,
  isFirstStep
}) => {
  const {
    fiscalYears,
    formData,
    saveCurrentStep,
  } = useFormContext();
  console.log(email)
  const { control, watch, getValues, reset } = methods;
  const anyBranchOffice = watch("anyBranchOffice");
  const registeredFederation = watch("registeredFederation");
  const natureOfWork = watch('natureOfWork')

  const fiscalYearOptions = fiscalYears?.map((fy) => ({
    value: fy.id,
    label: `${fy.yearNepali}`,
  })) || [];

  const { data: cooperativeData, isLoading, error } = useQuery({
    queryKey: ['cooperativeInfo', email],
    queryFn: () => getCooperativeInfoByEmail(email),
    enabled: !!email,
  });

  const saveBasicInfoMutation = useMutation({
    mutationFn: async (data) => {
      await saveCurrentStep();
      const dataWithEmail = {
        ...data,
        contactEmail: data.contactEmail || email
      };
      return data.id ?
        updateCooperativeInfo(dataWithEmail) :
        createCooperativeInfo(dataWithEmail);
    },
    onSuccess: (result) => {
      if (result?.id && !getValues('id')) {
        methods.setValue('id', result.id);
      }
      toast.success("Basic information saved successfully");
      if (isLastStep) {
        toast.success("All information has been saved successfully!");
      } else {
        setTimeout(() => {
          onNext();
        }, 500);
      }
    },
    onError: (error) => {
      console.error('Error saving basic info:', error);

      const errorMessage = error?.response?.data?.message ||
        error?.message ||
        'Failed to save basic information. Please try again.';
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    if (cooperativeData) {
      const formData = {
        classificationOfCooperative: cooperativeData.classificationOfCooperative,
        contactEmail: cooperativeData.contactEmail,
        contactMobilePhone: cooperativeData.contactMobilePhone,
        contactOfficePhone: cooperativeData.contactOfficePhone,
        contactPerson: cooperativeData.contactPerson,
        cooperativeCode: cooperativeData.cooperativeCode,
        coopsFullNameEng: cooperativeData.coopsFullNameEng,
        coopsFullNameNep: cooperativeData.coopsFullNameNep,
        coopsLogo: cooperativeData.coopsLogo,
        cscu: cooperativeData.cscu,
        dcu: cooperativeData.dcu,
        dscu: cooperativeData.dscu,
        fiscalYearId: cooperativeData.fiscalYearId,
        ncf: cooperativeData.ncf,
        panNo: cooperativeData.panNo,
        pcu: cooperativeData.pcu,
        pscu: cooperativeData.pscu,
        registerYear: cooperativeData.registerYear,
        registeredDateNep: cooperativeData.registeredDateNep,
        registeredFederation: cooperativeData.registeredFederation,
        registrationNo: cooperativeData.registrationNo,
        webUrl: cooperativeData.webUrl?.trim(),
        workingArea: cooperativeData.workingArea,
        id: cooperativeData.id,
      };
      reset(formData);
    }
  }, [cooperativeData, reset]);

  useEffect(() => {
    if (formData?.basic) {
      reset(formData.basic);
    }
  }, [formData, reset]);

  const handleSaveAndNext = async () => {
    try {
      const isValid = await methods.trigger();
      if (!isValid) {
        toast("Please fill in all required fields correctly.");
        return;
      }
      const currentFormData = getValues();
      saveBasicInfoMutation.mutate(currentFormData);
    } catch (error) {
      console.error('Error in handleSaveAndNext:', error);
      toast("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Loading basic information...</p>
        </div>
      </div>
    );
  }