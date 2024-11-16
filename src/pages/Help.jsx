import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Help = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "How do I book a flight?",
            answer: "To book a flight, use our search form to find available flights. Select your preferred flight, choose your seats, and proceed to payment."
        },
        {
            question: "What is the baggage allowance?",
            answer: "Each passenger is allowed one carry-on bag (7kg max) and one checked bag (23kg max). Additional baggage can be purchased during booking."
        },
        {
            question: "How can I change my booking?",
            answer: "You can modify your booking through your profile page up to 24 hours before departure. Changes may incur additional fees."
        },
        // Add more FAQs as needed
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Help Center
            </h1>

            {/* Search */}
            <div className="mb-8">
                <Input
                    type="search"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* FAQs */}
            <div className="space-y-6">
                {filteredFaqs.map((faq, index) => (
                    <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                            {faq.question}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Need More Help?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our support team is available 24/7 to assist you.
                </p>
                <div className="space-y-4">
                    <div>
                        <strong>Email:</strong> support@flightbooking.com
                    </div>
                    <div>
                        <strong>Phone:</strong> +1 (555) 123-4567
                    </div>
                    <Button>
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Help;