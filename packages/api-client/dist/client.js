import axios from 'axios';
export class ApiClient {
    constructor(baseURL = 'http://localhost:9095', config) {
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
        this.client.interceptors.response.use(response => response, error => {
            // Handle common errors here
            return Promise.reject(error);
        });
    }
    // Generic method to make API calls
    async request(config) {
        return this.client.request(config);
    }
    // Helper method for GET requests
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    // Helper method for POST requests
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    // Helper method for PUT requests
    async put(url, data, config) {
        const response = await this.client.put(url, data, config);
        return response.data;
    }
    // Helper method for DELETE requests
    async delete(url, config) {
        const response = await this.client.delete(url, config);
        return response.data;
    }
    // Helper method for PATCH requests
    async patch(url, data, config) {
        const response = await this.client.patch(url, data, config);
        return response.data;
    }
    // Get the underlying axios instance for advanced usage
    getAxiosInstance() {
        return this.client;
    }
}
// Export a default instance
export const defaultApiClient = new ApiClient();
//# sourceMappingURL=client.js.map