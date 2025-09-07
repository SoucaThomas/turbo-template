import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { paths } from './types';
export declare class ApiClient {
    private client;
    constructor(baseURL?: string, config?: AxiosRequestConfig);
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    getAxiosInstance(): AxiosInstance;
}
export declare const defaultApiClient: ApiClient;
export type { paths };
//# sourceMappingURL=client.d.ts.map