import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect } from "react";

const API_URL = "https://chat-backend-api-one.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // cleanup: remove interceptor when component unmounts
    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [getToken]);

  return api;
};
