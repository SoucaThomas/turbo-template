import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { operations, paths } from './types';
type Paths = paths;
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type ResponseType<T extends keyof Paths, M extends HttpMethod> = T extends keyof Paths ? M extends keyof Paths[T] ? Paths[T][M] extends {
    responses: infer R;
} ? R extends Record<string, any> ? R extends {
    200: infer Success;
} ? Success extends {
    content: infer C;
} ? C extends {
    'application/json': infer Data;
} ? Data : never : never : never : never : never : never : never;
type RequestBodyType<T extends keyof Paths, M extends HttpMethod> = T extends keyof Paths ? M extends keyof Paths[T] ? Paths[T][M] extends {
    requestBody: infer RB;
} ? RB extends {
    content: infer C;
} ? C extends {
    'multipart/form-data': infer Data;
} ? Data : C extends {
    'application/json': infer Data;
} ? Data : never : never : never : never : never;
export declare class TypedApiClient {
    private client;
    constructor(baseURL?: string, config?: AxiosRequestConfig);
    get<T extends keyof Paths>(path: T, config?: AxiosRequestConfig): Promise<ResponseType<T, 'get'>>;
    post<T extends keyof Paths>(path: T, data?: RequestBodyType<T, 'post'>, config?: AxiosRequestConfig): Promise<ResponseType<T, 'post'>>;
    put<T extends keyof Paths>(path: T, data?: RequestBodyType<T, 'put'>, config?: AxiosRequestConfig): Promise<ResponseType<T, 'put'>>;
    patch<T extends keyof Paths>(path: T, data?: RequestBodyType<T, 'patch'>, config?: AxiosRequestConfig): Promise<ResponseType<T, 'patch'>>;
    delete<T extends keyof Paths>(path: T, config?: AxiosRequestConfig): Promise<ResponseType<T, 'delete'>>;
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    getAxiosInstance(): AxiosInstance;
}
export declare const defaultTypedApiClient: TypedApiClient;
export type { paths, operations };
//# sourceMappingURL=typed-client.d.ts.map