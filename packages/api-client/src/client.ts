import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { paths } from './types';

export class ApiClient {
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

  // Generic method to make API calls
  async request<T = any>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.request(config);
  }

  // Helper method for GET requests
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  // Helper method for POST requests
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Helper method for PUT requests
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  // Helper method for DELETE requests
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Helper method for PATCH requests
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  // Get the underlying axios instance for advanced usage
  getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

// Export a default instance
export const defaultApiClient = new ApiClient();

// Export types for convenience
export type { paths };
