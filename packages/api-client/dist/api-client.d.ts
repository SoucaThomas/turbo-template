import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { operations } from './types';
export declare class ApiClient {
    private client;
    constructor(baseURL?: string, config?: AxiosRequestConfig);
    upload(file: File, config?: AxiosRequestConfig): Promise<operations['UploadController_uploadFile']['responses']['201']['content']['application/json']>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    getAxiosInstance(): AxiosInstance;
}
export declare const apiClient: ApiClient;
//# sourceMappingURL=api-client.d.ts.map