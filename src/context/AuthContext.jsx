import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000/api/users';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch user data
    const fetchUserData = async (token) => {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error fetching user data:', err);
            handleAuthError();
            throw err;
        }
    };

    // Handle authentication errors
    const handleAuthError = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setError('Authentication failed. Please login again.');
    };

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    await fetchUserData(token);
                } catch (err) {
                    handleAuthError();
                }
            }
            setLoading(false);
        };

        initializeAuth();

        // Cleanup function
        return () => {
            setLoading(true);
            setError(null);
        };
    }, []);

    // Add token refresh logic
    useEffect(() => {
        const refreshToken = async () => {
            const token = localStorage.getItem('token');
            if (token && user) {
                try {
                    await fetchUserData(token);
                } catch (err) {
                    handleAuthError();
                }
            }
        };

        // Refresh token every 14 minutes (assuming 15-minute token expiry)
        const intervalId = setInterval(refreshToken, 14 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [user]);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

            const { token } = response.data;
            
            if (!token) {
                throw new Error('No token received from server');
            }

            // Save token
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Fetch user data after successful login
            const userData = await fetchUserData(token);
            return { token, user: userData };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setError(null);
        setLoading(false);
    };

    // Check if token is valid
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token && !!user;
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        setError,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};