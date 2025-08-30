// Export the unified API client
export { ApiClient, apiClient } from "./api-client";

// Export all generated types
export type { paths, operations } from "./types";

// Re-export axios for convenience
export { default as axios } from "axios";
export type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
