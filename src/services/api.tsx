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
        const response = await apiClient.get('/fef86b13-9e2f-4e2d-b3ff-965db5e46c53');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default apiClient;