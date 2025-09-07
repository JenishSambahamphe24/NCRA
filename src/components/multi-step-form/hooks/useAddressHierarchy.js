import { useState, useEffect } from 'react';
import { getDistrictByProvinceCode } from '@/api/federalAddress.api';
import { getMunicipalitiesByDistrictCode } from './apiHandlers';

export const useAddressHierarchy = (initialProvince = '', initialDistrict = '') => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [loading, setLoading] = useState({
        districts: false,
        municipalities: false,
    });



    const loadDistricts = async (provinceCode) => {
        if (!provinceCode) {
            setDistricts([]);
            setMunicipalities([]);
            return;
        }
        setLoading((prev) => ({ ...prev, districts: true }));
        try {
            const data = await getDistrictsByProvinceCode(provinceCode);
            setDistricts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading districts:', error);
            setDistricts([]);
        } finally {
            setLoading((prev) => ({ ...prev, districts: false }));
        }
    };

    const loadMunicipalities = async (districtCode) => {
        if (!districtCode) {
            setMunicipalities([]);
            return;
        }
        setLoading((prev) => ({ ...prev, municipalities: true }));
        try {
            const data = await getMunicipalitiesByDistrictCode(districtCode);
            setMunicipalities(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading municipalities:', error);
            setMunicipalities([]);
        } finally {
            setLoading((prev) => ({ ...prev, municipalities: false }));
        }
    };

    return {
        provinces, // pass from parent if loaded externally
        districts,
        municipalities,
        loading,
        loadDistricts,
        loadMunicipalities,
        setProvinces, // optional
    };
};