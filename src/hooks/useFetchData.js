// src/hooks/useFetchData.js

import { AuthAxios } from "../helpers/axiosInstance";
import { getCookie } from "../utils/cookieAuth";
import { useQuery } from "@tanstack/react-query";

const useFetchData = (queryKey, apiUrl) => {
  const token = getCookie("authToken");

  const fetchData = async () => {
    try {
      const response = await AuthAxios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  return { data, error, isLoading, refetch };
};

export default useFetchData;
