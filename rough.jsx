{
    "id": 111,
        "cooperativeCode": "1992 00003",
            "coopsFullNameNep": "Idona Berg",
                "coopsFullNameEng": "Macaulay Sears",
                    "registerDate": "2025-08-08T00:00:00Z",
                        "registerYear": "1992",
                            "fiscalYearId": 1,
                                "fiscalYear": {
        "id": 1,
            "yearNepali": "2082/083",
                "yearEnglish": "2025/026",
                    "activeFiscalYear": true,
                        "index": 3,
                            "createdBy": "Mahek Maharjan",
                                "createdDate": "2025-07-07T08:30:47.675411Z",
                                    "updatedBy": "Unknown",
                                        "updatedDate": "2025-07-27T12:14:45.256961Z"
    },
    "registeredFiscalYear": "1973",
        "contactMobilePhone": "+1 (151) 367-8199",
            "contactOfficePhone": "+1 (643) 224-2916",
                "webUrl": "https://www.niwonef.cc",
                    "contactPerson": "Quae ut nesciunt et",
                        "contactPhone": "+1 (631) 532-9124",
                            "contactEmail": "jenishsambahamphe@gmail.com",
                                "panNo": "46754654",
                                    "registrationNo": "369",
                                        "classificationOfCooperative": "Province",
                                            "workingArea": "urban",
                                                "anyBranchOffice": true,
                                                    "numberOfBranch": 2,
                                                        "status": "Registration",
                                                            "states": [
                                                                1
                                                            ],
                                                                "folderName": null,
                                                                    "registeredFederation": true,
                                                                        "registeredFederationName": null,
                                                                            "registeredDateNep": "2000/12/09",
                                                                                "coopsLogo": null,
                                                                                    "dscu": false,
                                                                                        "dcu": true,
                                                                                            "pscu": false,
                                                                                                "pcu": false,
                                                                                                    "cscu": false,
                                                                                                        "ncf": false,
                                                                                                            "createdBy": "Unknown",
                                                                                                                "createdDate": "2025-08-27T03:29:44.117635Z",
                                                                                                                    "updatedBy": "Unknown",
                                                                                                                        "updatedDate": "2025-08-27T06:29:49.481676Z"
}

this is formData and here is my component
export const BasicInfo = ({ methods }) => {
    const { data: fiscalYears, isLoading, error } = useFiscalYears();
    const { formData } = useFormContext()
    console.log(formData)
    console.log(fiscalYears)
    const { control, watch } = methods;
    const anyBranchOffice = watch("anyBranchOffice");
    const registeredFederation = watch("registeredFederation");

    const fiscalYearOptions = fiscalYears?.map((fy) => ({
        value: fy.id,
        label: `${fy.yearNepali} / ${fy.yearEnglish}`,
    })) || [];

    return (
        <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 12, sm: 5 }}>
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

            <Grid item size={{ xs: 12, sm: 4 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 12, sm: 2.5 }}>
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

            <Grid item size={{ xs: 12, sm: 2.5 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 12, sm: 2 }}>
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
                <Grid item size={{ xs: 12, sm: 2 }}>
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

            <Grid item size={{ xs: 12, sm: 3 }}>
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

            <Grid item size={{ xs: 3 }}>
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
                <Grid item size={{ xs: 12 }}>
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
this is parent component const StepperHome = () => {
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
now my component should be able to display the formData at first and it should also allow users to edit and send http post request with the edited data.If the user doesnt edits the initial formData should be sent.upon clicking Next step it should send post req
this is tsx setup but my component is in jsx
export async function createCooperativeInfo(data: TCooperativeInfo) {
    const response = await store < TCooperativeInfo > ({
        endpoint: BASE_ENDPOINT,
        data: data,
    });
    return response;

  can this work or should i modify createCooperativeInfo
