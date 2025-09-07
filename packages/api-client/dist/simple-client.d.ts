import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { paths } from './types';
type ApiResponse<T = any> = T;
export declare class SimpleApiClient {
    private client;
    constructor(baseURL?: string, config?: AxiosRequestConfig);
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    getAxiosInstance(): AxiosInstance;
    uploadFile<T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
}
export declare const defaultSimpleApiClient: SimpleApiClient;
export type { paths };
//# sourceMappingURL=simple-client.d.ts.map