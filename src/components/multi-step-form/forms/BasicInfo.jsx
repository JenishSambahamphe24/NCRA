import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from "sonner";

import { Grid } from '@mui/material';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import NepaliDateInput from '../../common/NepaliDateInput';
import { useFormContext } from '@/context/form-context';
import { useCooperative } from '../cooperativeContext';
import {
  createCooperativeInfo,
  updateCooperativeInfo,
  getCooperativeInfoByEmail
} from '@/api/cooperative-info.api';

export const BasicInfo = ({
  email,
  methods,
  onNext,
  onPrevious,
  isLastStep,
  isFirstStep
}) => {
  const {
    formData,
  } = useFormContext();
  const { updateCooperativeId } = useCooperative();
  const { control, watch, getValues, reset } = methods;
  const registeredFederation = watch("registeredFederation");
  const natureOfWork = watch('natureOfWork');

  const { data: cooperativeData, isLoading, error } = useQuery({
    queryKey: ['cooperativeInfo', email],
    queryFn: () => getCooperativeInfoByEmail(email),
    enabled: !!email,
  });

  const saveBasicInfoMutation = useMutation({
    mutationFn: async (data) => {
      const dataWithEmail = {
        ...data,
        contactEmail: data.contactEmail || email
      };
      return data.id
        ? updateCooperativeInfo(dataWithEmail)
        : createCooperativeInfo(dataWithEmail);
    },

    onSuccess: (result) => {
      if (result) {
        methods.setValue('id', result.objCoop.id);
        updateCooperativeId(result.objCoop.id);
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

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-red-500">
          <p>Error loading cooperative data: {error.message}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Grid container spacing={2}>
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

        <Grid size={{ xs: 12, sm: 2 }}>
          <FormField
            control={control}
            name="natureOfWork"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Nature of Work</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Federal">Federal</SelectItem>
                      <SelectItem value="Province">Province</SelectItem>
                      <SelectItem value="LocalLevel">Local Level</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>

        {
          natureOfWork === 'other' && (
            <Grid size={{ xs: 12, sm: 2 }}>
              <FormField
                control={control}
                name="otherNatureOfWork"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Other Nature of work</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>

          )
        }

        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField
            control={control}
            name="nameOfSoftwareUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Name of software used</FormLabel>
                <FormControl>
                  <Input placeholder='Name of software used'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2 }}>
          <FormField
            control={control}
            name="currentWorkingStaffs"
            render={({ field }) => (
              <FormItem >
                <FormLabel  >Current Working Staffs</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="No of working staffs"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value ? parseInt(e.target.value) : "")
                    }
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
            name="registeredOffice"
            render={({ field }) => (
              <FormItem >
                <FormLabel  >Registered Office</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Office Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <FormField
            control={control}
            name="officeAddress"
            render={({ field }) => (
              <FormItem >
                <FormLabel  >Office Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Registered Office Address"
                    {...field}
                  />
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

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={handleSaveAndNext}
          disabled={saveBasicInfoMutation.isPending}
        >
          {saveBasicInfoMutation.isPending
            ? 'Saving...'
            : isLastStep
              ? 'Save & Complete'
              : 'Save & Next'
          }
        </Button>
      </div>
    </div>
  );
};