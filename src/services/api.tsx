import axios from 'axios';

const API_BASE_URL = 'https://run.mocky.io/v3';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('/5da8323a-7420-4e15-96d8-0636ec6343ba');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default apiClient;