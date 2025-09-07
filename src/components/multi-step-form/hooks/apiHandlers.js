import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getDistrictsByProvinceCode = async (provinceCode) => {
    if (!provinceCode) return [];
    const res = await axios.get(`${backendUrl}/GetDistrictByProvinceCode?provinceCode=${provinceCode}`);
    if (!res.ok) throw new Error(`Failed to fetch districts for province: ${provinceCode}`);
    return res.json();
};

export const getMunicipalitiesByDistrictCode = async (districtCode) => {
    if (!districtCode) return [];
    const res = await axios.get(`${backendUrl}/GetMunicipalityByDistrictCode?Discode=${districtCode}`);
    if (!res.ok) throw new Error(`Failed to fetch municipalities for district: ${districtCode}`);
    return res;
};