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
        const response = await apiClient.get('/015e6092-c167-42ad-ae97-b40290c662bb');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default apiClient;