// Date formatting helpers
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Time formatting helpers
export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Duration calculation
export const calculateDuration = (departureTime, arrivalTime) => {
    const start = new Date(departureTime);
    const end = new Date(arrivalTime);
    const duration = end - start;
    
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
};

// Price formatting
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};

// Input validation helpers
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
};

export const validatePhone = (phone) => {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
};

export const validatePassportNumber = (passport) => {
    // Basic passport format validation
    const re = /^[A-Z0-9]{6,9}$/;
    return re.test(passport);
};

// Flight related helpers
export const getFlightClass = (type) => {
    const classes = {
        economy: 'Economy',
        business: 'Business',
        first: 'First Class'
    };
    return classes[type.toLowerCase()] || type;
};

// Local storage helpers
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

// Error handling helper
export const getErrorMessage = (error) => {
    if (error.response) {
        // Server responded with error
        return error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // Request made but no response
        return 'Unable to connect to server';
    } else {
        // Other errors
        return error.message || 'An unexpected error occurred';
    }
};

// Search params helper
export const createSearchParams = (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
    });
    return searchParams.toString();
};

// Seat selection helpers
export const formatSeatNumber = (row, column) => {
    return `${row}${column}`;
};

export const isSeatAvailable = (seatNumber, bookedSeats) => {
    return !bookedSeats.includes(seatNumber);
};

// Booking reference generator
export const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';
    for (let i = 0; i < 6; i++) {
        reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return reference;
};

// Form data helpers
export const extractFormData = (form) => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};