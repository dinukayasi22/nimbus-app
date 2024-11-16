import { FaPlaneDeparture, FaUserShield, FaClock, FaHeadset } from 'react-icons/fa';

const AboutUs = () => {
    const features = [
        {
            icon: <FaPlaneDeparture className="h-6 w-6" />,
            title: "Easy Booking",
            description: "Book your flights with just a few clicks. Simple, fast, and convenient booking process."
        },
        {
            icon: <FaUserShield className="h-6 w-6" />,
            title: "Secure Payments",
            description: "Your transactions are protected with industry-standard security measures."
        },
        {
            icon: <FaClock className="h-6 w-6" />,
            title: "24/7 Availability",
            description: "Book your flights anytime, anywhere. Our service is available round the clock."
        },
        {
            icon: <FaHeadset className="h-6 w-6" />,
            title: "Customer Support",
            description: "Dedicated support team to assist you with your booking needs and queries."
        }
    ];

    const teamMembers = [
        {
            name: "John Doe",
            position: "CEO",
            image: "/assets/images/team/john-doe.jpg" // Add actual image path
        },
        {
            name: "Jane Smith",
            position: "Operations Manager",
            image: "/assets/images/team/jane-smith.jpg" // Add actual image path
        },
        // Add more team members as needed
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Welcome to FlightBooking
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Your trusted partner for hassle-free flight bookings. Experience seamless travel planning with our user-friendly platform.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We strive to make air travel accessible and convenient for everyone by providing 
                            a seamless booking experience, competitive prices, and exceptional customer service.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                            >
                                <div className="text-blue-600 dark:text-blue-400 flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                100K+
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                                Happy Customers
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                500+
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                                Destinations
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                24/7
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                                Customer Support
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={index}
                                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Have questions? Our team is here to help you.
                    </p>
                    <div className="inline-flex space-x-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Contact Us
                        </button>
                        <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;