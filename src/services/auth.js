import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/'; // Make sure this matches your backend URL

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/register`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    getProfile: async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${BASE_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Change password
    hangePassword: async (passwordData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                `${BASE_URL}/change-password`, 
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default authService;