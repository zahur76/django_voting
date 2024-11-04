import { useState } from "react";
import axios from "axios";
import useAxiosWithTokenInterceptor from "../helpers/jwtinterceptor";

interface IuseCrud<T> {
  dataCRUD: T[];
  fetchData: () => Promise<void>;
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initalData: T[], apiURL: string): IuseCrud<T> => {

    const tokenAxios = useAxiosWithTokenInterceptor();

    const BASE_URL = "http://127.0.0.1:8000/api";
    const [dataCRUD, setDataCRUD] = useState<T[]>(initalData);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
        const response = await tokenAxios.get(`${BASE_URL}${apiURL}`, {});
        const data = response.data;
        setDataCRUD(data);
        setError(null);
        setIsLoading(false);
        return data;
        } catch (error: any) {
        if (error.response && error.response.status === 400) {
            setError(new Error("400"));
        }
        setIsLoading(false);
        throw error;
        }
    };

    return { fetchData, dataCRUD, error, isLoading };
};
export default useCrud;
