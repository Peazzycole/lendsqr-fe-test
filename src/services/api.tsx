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
        const response = await apiClient.get('/8c4bd71f-8cd4-4abb-a379-c9eec29e3e16');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default apiClient;