import { Input } from "@/components/ui/input.tsx";
import NepaliDateInput from '../../common/NepaliDateInput';
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

export const BasicInfo = ({ methods, fiscalYears }) => {
  const { control, watch } = methods;

  const anyBranchOffice = watch("anyBranchOffice");
  const registeredFederation = watch("registeredFederation");

  const fiscalYearOptions = fiscalYears?.map((fy) => ({
    value: fy.id,
    label: `${fy.yearNepali} / ${fy.yearEnglish}`,
  })) || [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <FormField
          control={control}
          className="w-full"
          name="cooperativeCode"
          render={({ field }) => (
            <FormItem className="w-full" >
              <FormLabel>
                Cooperative Code <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter cooperative code" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormField
          control={control}
          name="fiscalYearId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Fiscal Year <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
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

      <Grid item xs={12} sm={4}>
        <FormField
          control={control}
          name="registrationNo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Registration Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Enter registration number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Grid>

      {/* Row 2: 6-6 */}
      <Grid item xs={12} sm={6}>
        <FormField
          control={control}
          name="coopsFullNameNep"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Full Cooperative Name (Nepali) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="सहकारीको पूरा नाम" {...field} />
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
            <FormItem className="w-full">
              <FormLabel>
                Full Cooperative Name (English) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Enter full name in English" {...field} />
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





      {/* Row 3: Contact Email, Mobile, Office Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem className="w-69">
              <FormLabel>
                Contact Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactMobilePhone"
          render={({ field }) => (
            <FormItem className="w-40">
              <FormLabel>
                Contact Mobile <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="98XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactOfficePhone"
          render={({ field }) => (
            <FormItem className="w-40">
              <FormLabel>Office Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="01-XXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="webUrl"
          render={({ field }) => (
            <FormItem className="w-65">
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem className="w-55">
              <FormLabel>
                Contact Person <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter contact person name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="panNo"
          render={({ field }) => (
            <FormItem className="w-40">
              <FormLabel>
                PAN Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter PAN number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 5: Dates and Years */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={control}
          name="registeredDateNep"
          render={({ field }) => (
            <FormItem className="w-52">
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

        <FormField
          control={control}
          name="registerDate"
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel>
                Registered Date <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="registerYear"
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel>
                Register Year <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter register year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="registeredFiscalYear"
          render={({ field }) => (
            <FormItem className="w-50">
              <FormLabel>
                Registered Fiscal Year <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter registered fiscal year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 6: Classification, Working Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="classificationOfCooperative"
          render={({ field }) => (
            <FormItem className="w-44">
              <FormLabel>
                Registered At <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
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

        <FormField
          control={control}
          name="workingArea"
          render={({ field }) => (
            <FormItem className="w-42">
              <FormLabel>
                Working Area <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
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
      </div>

      {/* Row 7: Branch Office */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="anyBranchOffice"
          render={({ field }) => (
            <FormItem className="w-50">
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

        {anyBranchOffice && (
          <FormField
            control={control}
            name="numberOfBranch"
            render={({ field }) => (
              <FormItem className="w-49">
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
        )}
      </div>

      {/* Row 8: Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="coopsLogo"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="w-49">
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
      </div>

      {/* Row 9: Federation Registration */}
      <FormField
        control={control}
        name="registeredFederation"
        render={({ field }) => (
          <FormItem className="w-80">
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

      {/* Row 10: Federation Checkboxes (only if registeredFederation is true) */}
      {registeredFederation && (
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
      )}
    </Grid>
  );
};