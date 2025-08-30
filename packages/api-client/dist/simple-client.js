import axios from "axios";
export class SimpleApiClient {
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
    // Simple GET method
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    // Simple POST method
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    // Simple PUT method
    async put(url, data, config) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }
    // Simple PATCH method
    async patch(url, data, config) {
        const response = await this.client.patch(url, data, config);
        return response.data;
    }
    // Simple DELETE method
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
    // Helper method for file uploads
    async uploadFile(url, file, config) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await this.client.post(url, formData, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
                ...config?.headers,
            },
        });
        return response.data;
    }
}
// Export a default simple instance
export const defaultSimpleApiClient = new SimpleApiClient();
//# sourceMappingURL=simple-client.js.map