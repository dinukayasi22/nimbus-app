import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/auth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const DUMMY_BOOKINGS = [
    {
        bookingNumber: 'BK123456',
        flightFrom: 'New York',
        flightTo: 'London',
        date: '2024-03-20',
        seatNumber: 'F1-A',
        class: 'First Class',
        status: 'Confirmed',
        price: 1200
    },
    {
        bookingNumber: 'BK123457',
        flightFrom: 'London',
        flightTo: 'Paris',
        date: '2024-04-15',
        seatNumber: 'B2-C',
        class: 'Business Class',
        status: 'Confirmed',
        price: 800
    },
    {
        bookingNumber: 'BK123458',
        flightFrom: 'Paris',
        flightTo: 'Dubai',
        date: '2024-05-01',
        seatNumber: 'E3-D',
        class: 'Economy Class',
        status: 'Upcoming',
        price: 500
    }
];

const Profile = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await authService.changePassword(passwordData);
            setSuccess('Password changed successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'Upcoming':
                return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
            default:
                return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                My Profile
            </h1>

            {/* Updated Tabs */}
            <div className="flex space-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        activeTab === 'profile'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile Details
                </button>
                <button
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        activeTab === 'bookings'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Booking History
                </button>
                <button
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        activeTab === 'security'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('security')}
                >
                    Security
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                    {success}
                </div>
            )}

            {/* Profile Details */}
            {activeTab === 'profile' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 transition-colors duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                First Name
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.firstName}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Last Name
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.lastName}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Email
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.email}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Mobile Number
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.mobileNo}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Passport Number
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.passportNumber}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                Country
                            </label>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {user.country}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking History Tab */}
            {activeTab === 'bookings' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Booking Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Flight
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Seat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Class
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {DUMMY_BOOKINGS.map((booking) => (
                                    <tr key={booking.bookingNumber} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {booking.bookingNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {booking.flightFrom} → {booking.flightTo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {new Date(booking.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {booking.seatNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {booking.class}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            ${booking.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 transition-colors duration-200"
                >
                    <Input
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value
                        })}
                        required
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                            text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Input
                        label="New Password"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value
                        })}
                        required
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                            text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value
                        })}
                        required
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 
                            text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                            dark:hover:bg-blue-600 text-white disabled:opacity-50 
                            disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? 'Changing Password...' : 'Change Password'}
                    </Button>
                </form>
            )}

            {/* Logout Button */}
            <div className="mt-8">
                <Button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-500 
                        dark:hover:bg-red-600 text-white transition-colors duration-200"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Profile;