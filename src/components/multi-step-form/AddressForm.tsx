import React, { useMemo } from "react";
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
import {
  getAllMunicipality,
  getAllProvinces,
  getDistrictByProvinceCode,
} from "@/api/federalAddress.api";
import { useQuery } from "@tanstack/react-query";

interface AddressFormProps {
  methods: UseFormReturn<any>;
  formData: any;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  methods,
  formData,
}) => {
  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: getAllProvinces,
  });
  const { data: districts, isLoading: isLoadingDistricts } = useQuery({
    queryKey: ["districtsByProvince", methods.watch("province")],
    queryFn: () =>
      getDistrictByProvinceCode({ provinceCode: methods.watch("province") }),
    enabled: !!methods.watch("province"),
  });

  const { data: allMunicipalities, isLoading: isLoadingMunicipalities } =
    useQuery({
      queryKey: ["municipalities"],
      queryFn: getAllMunicipality,
      enabled: !!methods.watch("province") && !!methods.watch("district"),
    });

  const municipalities = useMemo(() => {
    return !!methods.watch("district") &&
      !!methods.watch("province") &&
      !!allMunicipalities
      ? allMunicipalities?.filter(
        (m) =>
          methods.watch("district") &&
          m.districtCode === methods.watch("district"),
      )
      : [];
  }, [methods.watch("district"), methods.watch("province"), allMunicipalities]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div hidden>
        <FormField
          control={methods.control}
          name="id"
          render={({ field }) => {
            return <Input hidden {...field} />;
          }}
        />
      </div>
      <FormField
        control={methods.control}
        name="province"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingProvinces ? (
                      <SelectItem value="loading" disabled>
                        Loading provinces...
                      </SelectItem>
                    ) : (
                      provinces?.map((province) => (
                        <SelectItem
                          key={province.provinceCode}
                          value={province.provinceCode}
                        >
                          {province.provinceName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={methods.control}
        name="district"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDistricts ? (
                      <SelectItem value="loading" disabled>
                        Loading districts...
                      </SelectItem>
                    ) : (
                      districts?.map((district) => (
                        <SelectItem
                          key={district.districtCode}
                          value={district.districtCode}
                        >
                          {district.districtName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={methods.control}
        name="localLevel"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Municipality</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingMunicipalities ? (
                      <SelectItem value="loading" disabled>
                        Loading municipalities...
                      </SelectItem>
                    ) : (
                      municipalities?.map((municipality) => (
                        <SelectItem
                          key={municipality.municipalityNameEnglish}
                          value={municipality.municipalityNameEnglish}
                        >
                          {municipality.municipalityNameEnglish}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={methods.control}
        name="wardNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ward No.</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter Ward No."
                {...field}
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={methods.control}
        name="houseNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>House No.</FormLabel>
            <FormControl>
              <Input placeholder="Enter House No." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={methods.control}
        name="tole"
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
    </div>
  );
};
