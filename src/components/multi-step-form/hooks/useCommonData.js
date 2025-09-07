import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const useFiscalYears = () =>
    useQuery({
        queryKey: ['fiscalYears'],
        queryFn: async () => {
            const res = await axios.get(`${backendUrl}/FiscalYear`);
            return res.data;
        },
    });

export const useProvinces = () =>
    useQuery({
        queryKey: ['provinces'],
        queryFn: async () => {
            const res = await axios.get(`${backendUrl}/FederalAddress/GetAllProvinces`);
            return res.data;
        },
    });

export const useDistricts = () =>
    useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axios.get(`${backendUrl}/FederalAddress/GetAllDistrict`);
            return res.data;
        },
    });
