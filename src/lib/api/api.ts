import axios from "axios";
import { apiConfig } from "@/config/api";

export const api = axios.create({
  baseURL: apiConfig.purchBaseUrl,
  withCredentials: true,
});

// interceptor for auth error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("api err", err);
    return err.response
      ? err.response
      : {
          data: "Error sending request to server",
        };
  },
);
