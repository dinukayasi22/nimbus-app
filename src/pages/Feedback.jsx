import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        rating: '5',
        comment: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API call will go here
            console.log('Feedback data:', formData);
            setSuccess('Thank you for your feedback!');
            setFormData({ rating: '5', comment: '' });
        } catch (err) {
            setError('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-200">
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Share Your Feedback
                    </h2>
                    
                    {error && (
                        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 
                            text-red-700 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 
                            text-green-700 dark:text-green-400 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                How would you rate your experience?
                            </label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                                    dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-colors duration-200"
                            >
                                <option value="5" className="dark:bg-gray-700">5 - Excellent</option>
                                <option value="4" className="dark:bg-gray-700">4 - Good</option>
                                <option value="3" className="dark:bg-gray-700">3 - Average</option>
                                <option value="2" className="dark:bg-gray-700">2 - Poor</option>
                                <option value="1" className="dark:bg-gray-700">1 - Very Poor</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tell us about your experience
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Share your thoughts with us..."
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                                    dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    transition-colors duration-200 resize-none"
                                required
                            ></textarea>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                                dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg
                                transition-colors duration-200 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        >
                            Submit Feedback
                        </Button>
                    </form>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Your feedback helps us improve our services
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;