import useAuth from "@/store/auth.store";
import { API_BASE_URL } from "@env";
import axios, { AxiosInstance } from "axios";

export class ApiClient {
  static instance: AxiosInstance;

  private constructor() {}

  public static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      });

      // Request interceptor
      ApiClient.instance.interceptors.request.use((config) => {
        const accessToken = useAuth.getState().accessToken; // ✅ Zustand-safe
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      });

      // Response interceptor
      ApiClient.instance.interceptors.response.use(
        (response) => response, // ✅ always return the response
        (error) => {
          if (error.response?.status === 401) {
            // TODO: refresh logic
          }
          return Promise.reject(error); // ✅ ensure errors propagate
        }
      );
    }
    return ApiClient.instance;
  }
}
