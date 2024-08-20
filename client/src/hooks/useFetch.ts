import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

type UseAxiosProps = {
  config?: AxiosRequestConfig;
  method?: Method;
  autoFetch?: boolean;
};

type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
  devMessage?: string;
};

export const useFetch = <T>(
  url: string,
  body?: T,
  { config, method = "GET", autoFetch = true }: UseAxiosProps = {},
): [
  ApiResponse<T> | null,
  boolean,
  string | undefined,
  () => Promise<void>,
] => {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios<ApiResponse<T>>({
        url,
        method,
        data: body,
        ...config,
      });
      setData(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.message
        : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, config]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return [data, loading, error, fetchData];
};
