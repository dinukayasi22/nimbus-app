import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
                <MoonIcon className="h-5 w-5 text-gray-500" />
            )}
        </button>
    );
};

export default ThemeToggle;