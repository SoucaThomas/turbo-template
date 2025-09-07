import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { paths } from './types';

// Simple type for API responses
type ApiResponse<T = any> = T;

// Simple type for API requests
type ApiRequest<T = any> = T;

export class SimpleApiClient {
  private client: AxiosInstance;

  constructor(
    baseURL: string = 'http://localhost:9095',
    config?: AxiosRequestConfig
  ) {
    this.client = axios.create({
      baseURL,
      ...config,
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(config => {
      // You can add auth headers here if needed
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Handle common errors here
        return Promise.reject(error);
      }
    );
  }

  // Simple GET method
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Simple POST method
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Simple PUT method
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Simple PATCH method
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Simple DELETE method
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Generic method for advanced usage
  async request<T = any>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.request(config);
  }

  // Get the underlying axios instance for advanced usage
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }

  // Helper method for file uploads
  async uploadFile<T = any>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
    return response.data;
  }
}

// Export a default simple instance
export const defaultSimpleApiClient = new SimpleApiClient();

// Export types for convenience
export type { paths };
