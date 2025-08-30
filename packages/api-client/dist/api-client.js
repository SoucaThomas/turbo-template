import axios from "axios";
// Auto-generated API client based on OpenAPI spec
export class ApiClient {
    constructor(baseURL = "http://localhost:9095", config) {
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
        this.client.interceptors.response.use((response) => response, (error) => {
            // Handle common errors here
            return Promise.reject(error);
        });
    }
    // Auto-generated upload method based on OpenAPI spec
    async upload(file, config) {
        const formData = new FormData();
        formData.append("file", file);
        return this.post("/api/upload", formData, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers,
            },
        });
    }
    // Generic HTTP methods for other endpoints
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    async put(url, data, config) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }
    async patch(url, data, config) {
        const response = await this.client.patch(url, data, config);
        return response.data;
    }
    async delete(url, config) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
    // Generic method for advanced usage
    async request(config) {
        return this.client.request(config);
    }
    // Get the underlying axios instance for advanced usage
    getAxiosInstance() {
        return this.client;
    }
}
// Export a default instance
export const apiClient = new ApiClient();
//# sourceMappingURL=api-client.js.map