import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
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

// Flight related API calls
const flightAPI = {
    searchFlights: async (searchParams) => {
        try {
            const response = await api.get('/flights/search', { params: searchParams });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFlightById: async (flightId) => {
        try {
            const response = await api.get(`/flights/${flightId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Booking related API calls
const bookingAPI = {
    createBooking: async (bookingData) => {
        try {
            const response = await api.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserBookings: async () => {
        try {
            const response = await api.get('/bookings/user');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    cancelBooking: async (bookingId) => {
        try {
            const response = await api.delete(`/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Feedback related API calls
const feedbackAPI = {
    submitFeedback: async (feedbackData) => {
        try {
            const response = await api.post('/feedback', feedbackData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUserFeedback: async () => {
        try {
            const response = await api.get('/feedback/user');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export { flightAPI, bookingAPI, feedbackAPI };