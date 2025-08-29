import { fetch } from "@/lib/http.lib";
import {
  TDistrict,
  TMunicipality,
  TProvince,
} from "@/types/federal-address.type";

const BASE_ENDPOINT = "/FederalAddress";

export const getAllProvinces = async () => {
  const response = await fetch<TProvince[]>({
    endpoint: `${BASE_ENDPOINT}/GetAllProvinces`,
  });
  return response;
};

export const getByProvinceCode = async ({
  provinceCode,
}: {
  provinceCode: string;
}) => {
  const response = await fetch<TProvince>({
    endpoint: `${BASE_ENDPOINT}/GetByProvinceCode?provinceCode=${provinceCode}`,
  });
  return response;
};

export const getAllDistrict = async () => {
  const response = await fetch<TDistrict[]>({
    endpoint: `${BASE_ENDPOINT}/GetAllDistrict`,
  });
  return response;
};

export const getByDistrictCode = async ({
  districtCode,
}: {
  districtCode: string;
}) => {
  const response = await fetch<TDistrict>({
    endpoint: `${BASE_ENDPOINT}/GetByDistrictCode?districtCode=${districtCode}`,
  });
  return response;
};

export const getDistrictByProvinceCode = async ({
  provinceCode,
}: {
  provinceCode: string;
}) => {
  const response = await fetch<TDistrict[]>({
    endpoint: `${BASE_ENDPOINT}/GetDistrictByProvinceCode?provinceCode=${provinceCode}`,
  });
  return response;
};

export const getAllMunicipality = async () => {
  const response = await fetch<TMunicipality[]>({
    endpoint: `${BASE_ENDPOINT}/GetAllMunicipality`,
  });
  return response;
};

export const getByMunicipalityCode = async ({
  municipalityCode,
}: {
  municipalityCode: string;
}) => {
  const response = await fetch<TMunicipality>({
    endpoint: `${BASE_ENDPOINT}/GetByMunicipalityCode?municipalityCode=${municipalityCode}`,
  });
  return response;
};

export const getMunicipalityByDistrictCode = async ({
  districtCode,
}: {
  districtCode: string;
}) => {
  const response = await fetch<TMunicipality>({
    endpoint: `${BASE_ENDPOINT}/GetMunicipalityByDistrictCode?districtCode=${districtCode}`,
  });
  return response;
};

export const getMunicipalityByProvinceCode = async ({
  provinceCode,
}: {
  provinceCode: string;
}) => {
  const response = await fetch<TMunicipality>({
    endpoint: `${BASE_ENDPOINT}/GetMunicipalityByProvinceCode?provinceCode=${provinceCode}`,
  });
  return response;
};

export const getMunicipalityByDisAndMunCode = async ({
  districtCode,
  municipalityCode,
}: {
  districtCode: string;
  municipalityCode: string;
}) => {
  const response = await fetch<TMunicipality>({
    endpoint: `${BASE_ENDPOINT}/GetMunicipalityByDisAndMunCode?districtCode=${districtCode}&municipalityCode=${municipalityCode}`,
  });
  return response;
};
