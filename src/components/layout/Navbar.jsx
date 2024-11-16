import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Debug log to check user state
    useEffect(() => {
        console.log('Current user state:', user);
    }, [user]);

    const navigation = [
        { name: 'About Us', href: '/' },
        { name: 'Book', href: '/book' },
        { name: 'Feedback', href: '/feedback' },
        { name: 'Help', href: '/help' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    // Separate authenticated and non-authenticated navigation items
    const authNavigation = user
        ? [
            { name: 'Profile', href: '/profile' },
            { name: 'Logout', href: '#', onClick: handleLogout }
          ]
        : [
            { name: 'Login', href: '/login' },
            { name: 'Register', href: '/register' }
          ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-xl font-bold text-gray-800 dark:text-white">
                                Nimbus
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {/* Main Navigation */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === item.href
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Auth Navigation */}
                        {authNavigation.map((item) => (
                            item.onClick ? (
                                <button
                                    key={item.name}
                                    onClick={item.onClick}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}

                        {/* Welcome Message */}
                        {user && (
                            <span className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                Welcome, {user.firstName}
                            </span>
                        )}
                        
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300"
                        >
                            {isOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* Main Navigation */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Auth Navigation */}
                        {authNavigation.map((item) => (
                            item.onClick ? (
                                <button
                                    key={item.name}
                                    onClick={item.onClick}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}

                        {/* Welcome Message in Mobile Menu */}
                        {user && (
                            <div className="px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300">
                                Welcome, {user.firstName}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;