/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export abstract class ApiService {
  protected readonly axiosInstance: AxiosInstance;


  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://crypto-school.test/api', defaultHeaders?: Record<string, string>, timeout?: number) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: defaultHeaders,
      timeout: timeout || 10000, 
    });

    this.initializeResponseInterceptor();

    const token = localStorage.getItem("authToken");
    if (token) {
      this.setAuthToken(token);
    }
    
  }

  private setAuthToken(token: string) {
    this.setDefaultHeader("Authorization", `Bearer ${token}`);
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  }

  public addRequestInterceptor(onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, onRejected?: (error: any) => any) {
    this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
  }

  public addResponseInterceptor(onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected?: (error: any) => any) {
    this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
  }

  public setBaseURL(newBaseURL: string) {
    this.axiosInstance.defaults.baseURL = newBaseURL;
  }

  public setDefaultHeader(header: string, value: string) {
    this.axiosInstance.defaults.headers.common[header] = value;
  }

  protected handleResponse({ data }: AxiosResponse) {
    return data;
  }

  protected handleError(error: AxiosError) {
    return Promise.reject(error);
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.get<T>(url, config);
  }
  
  protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.post<T>(url, data, config);
  }
  
  protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.put<T>(url, data, config);
  }
  
  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}