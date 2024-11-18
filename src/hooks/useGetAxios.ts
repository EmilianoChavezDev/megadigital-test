import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useGetAxios = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.get(
          `${import.meta.env.VITE_API_URL}${path}`
        );
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};

export default useGetAxios;
