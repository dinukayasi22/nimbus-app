import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        // Check system preference if no saved theme
        if (!savedTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedTheme === 'dark';
    });

    useEffect(() => {
        // Update HTML class and local storage when theme changes
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    const value = {
        darkMode,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};