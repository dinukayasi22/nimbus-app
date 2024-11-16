import { Link } from 'react-router-dom';

const Footer = () => {
    const links = [
        { name: 'About Us', href: '/' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Links */}
                    <div className="flex space-x-6">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                        © {new Date().getFullYear()} FlightBooking. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;