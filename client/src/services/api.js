import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchMarketPrices = async (filters = {}) => {
    try {
        const response = await api.get('/market', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching market prices:', error);
        throw error;
    }
};

// Product APIs
export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

// Scheme APIs
export const fetchSchemes = async (params = {}) => {
    try {
        const response = await api.get('/agri_schemes', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching schemes:', error);
        throw error;
    }
};

export default api;


