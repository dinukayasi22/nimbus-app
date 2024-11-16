import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        gender: '',
        passportNumber: '',
        mobileNo: '',
        country: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await register(formData);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 
            bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl 
                shadow-lg transition-all duration-200">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white 
                        transition-colors duration-200">
                        Create your account
                    </h2>
                </div>

                {error && (
                    <div className="p-4 text-sm text-red-700 dark:text-red-400 bg-red-100 
                        dark:bg-red-900/30 rounded-lg border border-red-400 dark:border-red-600 
                        transition-colors duration-200">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="appearance-none relative block w-full px-3 py-2 
                                    border border-gray-300 dark:border-gray-600 
                                    placeholder-gray-500 dark:placeholder-gray-400
                                    text-gray-900 dark:text-white 
                                    rounded-lg focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 focus:border-transparent
                                    bg-white dark:bg-gray-700
                                    transition-colors duration-200"
                            />
                            <Input
                                label="Middle Name"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-3 py-2 
                                    border border-gray-300 dark:border-gray-600 
                                    placeholder-gray-500 dark:placeholder-gray-400
                                    text-gray-900 dark:text-white 
                                    rounded-lg focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 focus:border-transparent
                                    bg-white dark:bg-gray-700
                                    transition-colors duration-200"
                            />
                        </div>

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="appearance-none relative block w-full px-3 py-2 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                text-gray-900 dark:text-white 
                                rounded-lg focus:outline-none focus:ring-2 
                                focus:ring-blue-500 focus:border-transparent
                                bg-white dark:bg-gray-700
                                transition-colors duration-200"
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="appearance-none relative block w-full px-3 py-2 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                text-gray-900 dark:text-white 
                                rounded-lg focus:outline-none focus:ring-2 
                                focus:ring-blue-500 focus:border-transparent
                                bg-white dark:bg-gray-700
                                transition-colors duration-200"
                        />

                        <div className="space-y-1">
                            <label 
                                htmlFor="gender" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 
                                    transition-colors duration-200"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                                    rounded-lg shadow-sm text-gray-900 dark:text-white
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    bg-white dark:bg-gray-700 
                                    transition-colors duration-200"
                            >
                                <option value="" className="dark:bg-gray-700">Select Gender</option>
                                <option value="male" className="dark:bg-gray-700">Male</option>
                                <option value="female" className="dark:bg-gray-700">Female</option>
                                <option value="other" className="dark:bg-gray-700">Other</option>
                            </select>
                        </div>

                        <Input
                            label="Passport Number"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleChange}
                            required
                            className="input-class"
                        />
                        <Input
                            label="Mobile Number"
                            name="mobileNumber"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className="input-class"
                        />
                        <Input
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            className="input-class"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-class"
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input-class"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 
                            dark:bg-blue-500 dark:hover:bg-blue-600 
                            text-white font-medium py-2 px-4 rounded-lg
                            transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-blue-500 dark:focus:ring-offset-gray-800
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Creating account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </Button>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 
                        transition-colors duration-200">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="font-medium text-blue-600 hover:text-blue-500 
                                dark:text-blue-400 dark:hover:text-blue-300
                                transition-colors duration-200"
                        >
                            Sign in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

const inputClass = `
    appearance-none relative block w-full px-3 py-2 
    border border-gray-300 dark:border-gray-600 
    placeholder-gray-500 dark:placeholder-gray-400
    text-gray-900 dark:text-white 
    rounded-lg focus:outline-none focus:ring-2 
    focus:ring-blue-500 focus:border-transparent
    bg-white dark:bg-gray-700
    transition-colors duration-200
`;