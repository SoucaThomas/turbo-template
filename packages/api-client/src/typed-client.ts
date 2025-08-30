import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { paths, operations } from "./types";

// Type helpers for better type inference
type Paths = paths;
type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

// Extract response types from paths
type ResponseType<T extends keyof Paths, M extends HttpMethod> = T extends keyof Paths
    ? M extends keyof Paths[T]
        ? Paths[T][M] extends { responses: infer R }
            ? R extends Record<string, any>
                ? R extends { 200: infer Success }
                    ? Success extends { content: infer C }
                        ? C extends { "application/json": infer Data }
                            ? Data
                            : never
                        : never
                    : never
                : never
            : never
        : never
    : never;

// Extract request body types from paths
type RequestBodyType<T extends keyof Paths, M extends HttpMethod> = T extends keyof Paths
    ? M extends keyof Paths[T]
        ? Paths[T][M] extends { requestBody: infer RB }
            ? RB extends { content: infer C }
                ? C extends { "multipart/form-data": infer Data }
                    ? Data
                    : C extends { "application/json": infer Data }
                    ? Data
                    : never
                : never
            : never
        : never
    : never;

export class TypedApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string = "http://localhost:9095", config?: AxiosRequestConfig) {
        this.client = axios.create({
            baseURL,
            ...config,
        });

        // Add request interceptor for authentication
        this.client.interceptors.request.use((config) => {
            // You can add auth headers here if needed
            return config;
        });

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle common errors here
                return Promise.reject(error);
            }
        );
    }

    // Typed GET method
    async get<T extends keyof Paths>(
        path: T,
        config?: AxiosRequestConfig
    ): Promise<ResponseType<T, "get">> {
        const response = await this.client.get<ResponseType<T, "get">>(path as string, config);
        return response.data;
    }

    // Typed POST method
    async post<T extends keyof Paths>(
        path: T,
        data?: RequestBodyType<T, "post">,
        config?: AxiosRequestConfig
    ): Promise<ResponseType<T, "post">> {
        const response = await this.client.post<ResponseType<T, "post">>(
            path as string,
            data,
            config
        );
        return response.data;
    }

    // Typed PUT method
    async put<T extends keyof Paths>(
        path: T,
        data?: RequestBodyType<T, "put">,
        config?: AxiosRequestConfig
    ): Promise<ResponseType<T, "put">> {
        const response = await this.client.put<ResponseType<T, "put">>(
            path as string,
            data,
            config
        );
        return response.data;
    }

    // Typed PATCH method
    async patch<T extends keyof Paths>(
        path: T,
        data?: RequestBodyType<T, "patch">,
        config?: AxiosRequestConfig
    ): Promise<ResponseType<T, "patch">> {
        const response = await this.client.patch<ResponseType<T, "patch">>(
            path as string,
            data,
            config
        );
        return response.data;
    }

    // Typed DELETE method
    async delete<T extends keyof Paths>(
        path: T,
        config?: AxiosRequestConfig
    ): Promise<ResponseType<T, "delete">> {
        const response = await this.client.delete<ResponseType<T, "delete">>(
            path as string,
            config
        );
        return response.data;
    }

    // Generic method for advanced usage
    async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.request(config);
    }

    // Get the underlying axios instance for advanced usage
    getAxiosInstance(): AxiosInstance {
        return this.client;
    }
}

// Export a default typed instance
export const defaultTypedApiClient = new TypedApiClient();

// Export types for convenience
export type { paths, operations };
