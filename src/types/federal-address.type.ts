export type TProvince = {
  id: number;
  provinceCode: string;
  provinceName: string;
};

export type TDistrict = {
  id: number;
  districtCode: string;
  districtName: string;
  provinceCode: string;
};

export type TMunicipality = {
  id: number;
  municipalityCode: string;
  municipalityNameEnglish: string;
  municipalityNameNepali: string;
  districtCode: string;
  provinceCode: string;
  totalWard: number;
};
