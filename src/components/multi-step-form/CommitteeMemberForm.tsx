import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  getAllMunicipality,
  getAllProvinces,
  getDistrictByProvinceCode,
} from "@/api/federalAddress.api";

interface CommitteeMemberFormProps {
  methods: UseFormReturn<any>;
  memberIndex: number;
}

export const CommitteeMemberForm: React.FC<CommitteeMemberFormProps> = ({
  methods,
  memberIndex,
}) => {
  // Debug logging
  console.log("CommitteeMemberForm rendered:", {
    memberIndex,
    methods: !!methods,
  });

  // Early return if methods is not provided
  if (!methods) {
    console.error("methods prop is required but not provided");
    return (
      <div className="p-4 border border-red-500 bg-red-50 text-red-700">
        Error: Form methods not provided
      </div>
    );
  }

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: provincesError,
  } = useQuery({
    queryKey: ["provinces"],
    queryFn: getAllProvinces,
  });

  // Debug API responses
  console.log("Provinces query:", {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: provincesError,
  });

  const provinceFieldName = `committee.${memberIndex}.province`;
  const districtFieldName = `committee.${memberIndex}.district`;
  const localLevelFieldName = `committee.${memberIndex}.localLevel`;
  const wardNoFieldName = `committee.${memberIndex}.wardNo`;
  const toleFieldName = `committee.${memberIndex}.tole`;

  const provinceValue = methods.watch(provinceFieldName);
  const districtValue = methods.watch(districtFieldName);

  console.log("Form values:", { provinceValue, districtValue });

  const {
    data: districts,
    isLoading: isLoadingDistricts,
    error: districtsError,
  } = useQuery({
    queryKey: ["districtsByProvince", provinceValue],
    queryFn: () => getDistrictByProvinceCode({ provinceCode: provinceValue }),
    enabled: !!provinceValue,
  });

  const {
    data: allMunicipalities,
    isLoading: isLoadingMunicipalities,
    error: municipalitiesError,
  } = useQuery({
    queryKey: ["municipalities"],
    queryFn: getAllMunicipality,
    enabled: !!provinceValue && !!districtValue,
  });

  const municipalities =
    allMunicipalities && districtValue && provinceValue
      ? allMunicipalities?.filter(
        (m) => !!districtValue && m.districtCode === districtValue,
      )
      : [];

  // Add visible wrapper with debug info
  return (
    <div className="w-full p-4 border border-gray-200 bg-white rounded-lg">
      {/* Debug header - remove in production */}
      <div className="mb-4 p-2 bg-gray-100 text-xs text-gray-600 rounded">
        Debug: Member Index {memberIndex} - Form rendered successfully
        {provincesError && (
          <div className="text-red-600">
            Province Error: {provincesError.message}
          </div>
        )}
        {districtsError && (
          <div className="text-red-600">
            District Error: {districtsError.message}
          </div>
        )}
        {municipalitiesError && (
          <div className="text-red-600">
            Municipality Error: {municipalitiesError.message}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-4">
        Committee Member {memberIndex + 1}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.committeeFormulationAssembly`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Committee Formulation Assembly</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Committee Formulation Assembly"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.middleName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Middle Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.gender`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.phoneNumber`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={provinceFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    console.log("Province selected:", value);
                    field.onChange(value);
                    methods.setValue(districtFieldName, undefined);
                    methods.setValue(localLevelFieldName, undefined);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingProvinces ? (
                      <SelectItem value="loading" disabled>
                        Loading provinces...
                      </SelectItem>
                    ) : provinces && provinces.length > 0 ? (
                      provinces.map((province) => (
                        <SelectItem
                          key={province.provinceCode}
                          value={province.provinceCode}
                        >
                          {province.provinceName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>
                        No provinces available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={districtFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    console.log("District selected:", value);
                    field.onChange(value);
                    methods.setValue(localLevelFieldName, undefined);
                  }}
                  value={field.value}
                  disabled={!provinceValue}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !provinceValue
                          ? "Select Province first"
                          : "Select District"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDistricts ? (
                      <SelectItem value="loading" disabled>
                        Loading districts...
                      </SelectItem>
                    ) : districts && districts.length > 0 ? (
                      districts.map((district) => (
                        <SelectItem
                          key={district.districtCode}
                          value={district.districtCode}
                        >
                          {district.districtName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>
                        No districts available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={localLevelFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Municipality</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!provinceValue || !districtValue}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !provinceValue || !districtValue
                          ? "Select Province and District first"
                          : "Select Municipality"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingMunicipalities ? (
                      <SelectItem value="loading" disabled>
                        Loading municipalities...
                      </SelectItem>
                    ) : municipalities && municipalities.length > 0 ? (
                      municipalities.map((municipality) => (
                        <SelectItem
                          key={municipality.municipalityCode}
                          value={municipality.municipalityCode}
                        >
                          {municipality.municipalityNameEnglish}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>
                        No municipalities available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={wardNoFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ward No.</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Ward No."
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={toleFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tole/Street</FormLabel>
              <FormControl>
                <Input placeholder="Enter Tole/Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.panCard`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Card</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name={`committee.${memberIndex}.nidCard`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>NID Card</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
