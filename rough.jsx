import { fetch, replace, store } from "@/lib/http.lib";
import { TCooperativeInfo } from "@/types/cooperative.type";

const BASE_ENDPOINT = "/CooperativeInfo";
const BASE_POST_ENDPOINT = "/CooperativeInfo/create";

export async function createCooperativeInfo(data: TCooperativeInfo) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key] as any);
    }
  }

  const response = await store<FormData>({
    endpoint: BASE_POST_ENDPOINT,
    data: formData,
    headers: {
      // usually, you can omit content-type and let browser set it automatically for FormData
      // 'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function updateCooperativeInfo({ id, ...data }: TCooperativeInfo) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key] as any);
    }
  }

  const response = await replace<FormData>({
    endpoint: `${BASE_ENDPOINT}/${id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}


export async function getCooperativeInfoByEmail(email: string) {
  const response = await fetch<TCooperativeInfo>({
    endpoint: `${BASE_ENDPOINT}/${email}`,
  });
  return response;
}

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
    {
        id: 'committee',
        title: 'Committee',
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
                    <CardContent >
                        <Form {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} >
                                <CurrentStepComponent methods={methods} />
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

export const BasicInfo = ({ methods }) => {
  const { data: fiscalYears, isLoading, error } = useFiscalYears();
  const { formData } = useFormContext()
  const { basic } = formData;
  const { control, watch } = methods;
  const anyBranchOffice = watch("anyBranchOffice");
  const registeredFederation = watch("registeredFederation");

  const fiscalYearOptions = fiscalYears?.map((fy) => ({
    value: fy.id,
    label: `${fy.yearNepali}`,
  })) || [];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="cooperativeCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Cooperative Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter cooperative code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="fiscalYearId"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Fiscal Year</FormLabel>
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

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="registrationNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter registration number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
        <FormField
          control={control}
          name="coopsFullNameNep"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Full Cooperative Name (Nepali)</FormLabel>
              <FormControl>
                <Input placeholder="सहकारीको पूरा नाम" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <FormField
          control={control}
          name="coopsFullNameEng"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Full Cooperative Name (English)</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name in English" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2.5 }}>
        <FormField
          control={control}
          name="contactMobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Contact Mobile</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="98XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2.5 }}>
        <FormField
          control={control}
          name="contactOfficePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="01-XXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="webUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact person name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="panNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>PAN Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter PAN number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="registeredDateNep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registered Date (Nepali)</FormLabel>
              <FormControl>
                <NepaliDateInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="2080/09/09 (YYYY/MM/DD)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="registerDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Registered Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="registerYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Register Year</FormLabel>
              <FormControl>
                <Input placeholder="Enter register year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="registeredFiscalYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Registered Fiscal Year</FormLabel>
              <FormControl>
                <Input placeholder="Enter registered fiscal year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="classificationOfCooperative"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Registered At</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Federal">Federal</SelectItem>
                    <SelectItem value="Province">Province</SelectItem>
                    <SelectItem value="LocalLevel">Local Level</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="workingArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Working Area</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 2 }}>
        <FormField
          control={control}
          name="anyBranchOffice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Any Branch Office?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      {anyBranchOffice && (
        <Grid size={{ xs: 12, sm: 2 }}>
          <FormField
            control={control}
            name="numberOfBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Branches</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of branches"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>
      )}

      <Grid size={{ xs: 12, sm: 3 }}>
        <FormField
          control={control}
          name="coopsLogo"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Cooperative Logo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        <FormField
          control={control}
          name="registeredFederation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is registered in any Federation?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      {registeredFederation && (
        <Grid size={{ xs: 12 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {[
              { name: "dscu", label: "District Subjective Cooperative Union Ltd." },
              { name: "dcu", label: "District Cooperative Union Ltd." },
              { name: "pscu", label: "Provincial Subjective Cooperative Union Ltd." },
              { name: "pcu", label: "Provincial Cooperative Union Ltd." },
              { name: "cscu", label: "Central Subjective Cooperative Union Ltd." },
              { name: "ncf", label: "National Cooperative Federation Ltd." },
            ].map((item) => (
              <FormField
                key={item.name}
                control={control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal mb-0">{item.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </Grid>
      )}
    </Grid>
  );
};
the basic response looks like in my component , it should be able to display the response while also enabling to edit. Upon clicking next step it should send http post req if only successfull it should be allowed to go next stepper
