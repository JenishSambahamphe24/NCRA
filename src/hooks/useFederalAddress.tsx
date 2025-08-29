import { getAllDistrict, getAllMunicipality, getAllProvinces, getByDistrictCode, getByMunicipalityCode, getByProvinceCode, getDistrictByProvinceCode, getMunicipalityByDisAndMunCode, getMunicipalityByDistrictCode, getMunicipalityByProvinceCode } from "@/api/federalAddress.api";
import { useQuery } from "@tanstack/react-query";

  const useGetAllProvinces = () => {
    return useQuery({
      queryKey: ["provinces"],
      queryFn: getAllProvinces,
    });
  };

  const useGetByProvinceCode = (provinceCode) => {
    return useQuery({
      queryKey: ["province", provinceCode],
      queryFn: () => getByProvinceCode({provinceCode}),
      enabled: !!provinceCode,
    });
  };

  const useGetAllDistrict = () => {
    return useQuery({
      queryKey: ["districts"],
      queryFn: getAllDistrict,
    });
  };

  const useGetByDistrictCode = (districtCode) => {
    return useQuery({
      queryKey: ["district", districtCode],
      queryFn: () => getByDistrictCode({districtCode}),
      enabled: !!districtCode,
    });
  };

  const useGetDistrictByProvinceCode = (provinceCode) => {
    return useQuery({
      queryKey: ["districtsByProvince", provinceCode],
      queryFn: () => getDistrictByProvinceCode({provinceCode}),
      enabled: !!provinceCode,
    });
  };

  const useGetAllMunicipality = () => {
    return useQuery({
      queryKey: ["municipalities"],
      queryFn: getAllMunicipality,
    });
  };

  const useGetByMunicipalitycode = (municipalityCode) => {
    return useQuery({
      queryKey: ["municipality", municipalityCode],
      queryFn: () => getByMunicipalityCode({municipalityCode}),   
      enabled: !!municipalityCode,
    });
  };

  const useGetMunicipalityByDistrictCode = (districtCode) => {
    return useQuery({
      queryKey: ["municipalitiesByDistrict", districtCode],
      queryFn: () => getMunicipalityByDistrictCode({districtCode}),
      enabled: !!districtCode,
    });
  };

  const useGetMunicipalityByProvinceCode = (provinceCode) => {
    return useQuery({
      queryKey: ["municipalitiesByProvince", provinceCode],
      queryFn: () => getMunicipalityByProvinceCode({provinceCode}),
      enabled: !!provinceCode,
    });
  };

  const useGetMunicipalityByDisAndMunCode = (
    districtCode,
    municipalityCode
  ) => {
    return useQuery({
      queryKey: ["municipalityByDisAndMun", districtCode, municipalityCode],
      queryFn: () => getMunicipalityByDisAndMunCode({districtCode, municipalityCode}),
      enabled: !!districtCode && !!municipalityCode,  
    });
  };



  export {
    useGetAllProvinces,
    useGetByProvinceCode,
    useGetAllDistrict,
    useGetByDistrictCode,
    useGetDistrictByProvinceCode,
    useGetAllMunicipality,
    useGetByMunicipalitycode,
    useGetMunicipalityByDistrictCode,
    useGetMunicipalityByProvinceCode,
    useGetMunicipalityByDisAndMunCode,
  };