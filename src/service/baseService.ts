import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestHeaders,
  type AxiosResponse,
} from "axios";
// import { setPageLoading, setPermissions } from "../store/slices/commonSlice";
// import store from "../store/slices/store";
// import { logout } from "../utils/logout";
// import type { IApiResponse, IAuthResponse } from "../common/interface";

export interface IApiResponse<TResponse = null, TError = TResponse> {
  statusCode: number;
  status: string;
  message: string;
  data?: TResponse;
  error?: IApiResponse<TError>;
}

export interface IPermissionDetails {
  name: string;
  permissions: string[];
}

export interface IAuthResponse {
  status: number;
  token: string;
  role: string;
  permission_details: IPermissionDetails;
}

const API_BASE_URL = "";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
let apiCallCount = 0;
const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");
  try {
    const response = await axiosInstance.post<IAuthResponse>(
      "/auth/refresh",
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      //   store.dispatch(
      //     setPermissions(response.data.permission_details?.permissions ?? [])
      //   );
      return response.data.token;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (err) {
    // logout();
    throw err;
  }
};
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    apiCallCount++;
    // store.dispatch(setPageLoading(true));
    const token = sessionStorage.getItem("token");
    if (token && config.url && !config.url.includes("/auth")) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    apiCallCount--;
    if (apiCallCount === 0) {
      //   store.dispatch(setPageLoading(false));
    }
    return Promise.reject(error);
  }
);
// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    apiCallCount--;
    if (apiCallCount === 0) {
      //   store.dispatch(setPageLoading(false));
    }
    return response;
  },
  async (error: AxiosError) => {
    apiCallCount--;
    if (apiCallCount === 0) {
      //   store.dispatch(setPageLoading(false));
    }
    const originalRequest = { _retry: false, ...error.config };
    if (
      originalRequest &&
      error.response?.status === 401 &&
      (error.response?.data as IApiResponse)?.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (!originalRequest.headers) {
          originalRequest.headers = {} as AxiosRequestHeaders;
        }
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
