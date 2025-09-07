// Export the unified API client

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// Re-export axios for convenience
export { default as axios } from 'axios';
export { ApiClient, apiClient } from './api-client';
// Export all generated types
export type { operations, paths } from './types';
