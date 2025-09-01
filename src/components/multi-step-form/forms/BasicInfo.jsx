import { Input } from "@/components/ui/input.tsx";
import NepaliDateInput from '../../common/NepaliDateInput';
import { useFiscalYears } from "@/hooks/useFiscalYear";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Grid } from "@mui/material";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "@/context/form-context";

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
    label: `${fy.yearNepali}`,
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