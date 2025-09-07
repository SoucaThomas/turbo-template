import axios from 'axios';
export class TypedApiClient {
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
    // Typed GET method
    async get(path, config) {
        const response = await this.client.get(path, config);
        return response.data;
    }
    // Typed POST method
    async post(path, data, config) {
        const response = await this.client.post(path, data, config);
        return response.data;
    }
    // Typed PUT method
    async put(path, data, config) {
        const response = await this.client.put(path, data, config);
        return response.data;
    }
    // Typed PATCH method
    async patch(path, data, config) {
        const response = await this.client.patch(path, data, config);
        return response.data;
    }
    // Typed DELETE method
    async delete(path, config) {
        const response = await this.client.delete(path, config);
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
// Export a default typed instance
export const defaultTypedApiClient = new TypedApiClient();
//# sourceMappingURL=typed-client.js.map