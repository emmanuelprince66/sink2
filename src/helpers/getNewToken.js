import axios from "axios";
import { AuthAxios } from "./axiosInstance";
export const getUserToken = async (token) => {
  const res = await AuthAxios({
    url: "/auth/refresh-token/",
    method: "POST",
    data: { refresh: token },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res?.data;
};
