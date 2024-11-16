import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Button from '../components/common/Button';
import SeatMap from './SeatMap';
import { useNavigate } from 'react-router-dom'

const Book = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookingData, setBookingData] = useState({
        class: 'Economy Class',
        seatNumber: null
    });

    // Fetch flights
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                setFlights(response.data);
            } catch (err) {
                console.error('Error fetching flights:', err);
                setError('Failed to load flights');
            }
        };

        fetchFlights();
    }, []);

    // Calculate price based on class type
    const getPrice = (flight, classType) => {
        if (!flight) return 0;
        
        switch (classType) {
            case 'First Class':
                return flight.firstClassPrice;
            case 'Business Class':
                return flight.businessClassPrice;
            case 'Economy Class':
                return flight.economyClassPrice;
            default:
                return 0;
        }
    };

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
        setBookingData({
            class: 'Economy Class',
            seatNumber: null
        });
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (!bookingData.seatNumber) {
            setError('Please select a seat before confirming the booking');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                flightId: selectedFlight._id,
                classType: bookingData.class,
                seatNumber: bookingData.seatNumber
            });

            navigate('/booking-confirmation', { 
                state: { 
                    bookingDetails: response.data.booking 
                }
            });
        } catch (err) {
            setError(err.response?.data || 'Error creating booking');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className=" mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Available Flights
            </h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                    {error}
                </div>
            )}

            {/* Flights Table */}
            <div className="overflow-x-auto mb-8 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                From → To
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Departure Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Return Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Flight Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Economy Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Business Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                First Class Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {flights.map((flight) => (
                            <tr 
                                key={flight._id}
                                className={`
                                    hover:bg-gray-50 dark:hover:bg-gray-700 
                                    ${selectedFlight?._id === flight._id 
                                        ? 'bg-blue-50 dark:bg-blue-900/50' 
                                        : 'bg-white dark:bg-gray-800'
                                    }
                                `}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    {flight.from} → {flight.to}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    {new Date(flight.departDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    {flight.flightType === 'Return' && flight.returnDate 
                                        ? new Date(flight.returnDate).toLocaleDateString()
                                        : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    {flight.flightType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    ${flight.economyClassPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    ${flight.businessClassPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    ${flight.firstClassPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Button
                                        onClick={() => handleFlightSelect(flight)}
                                        className={`
                                            transition-colors duration-200
                                            ${selectedFlight?._id === flight._id 
                                                ? 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600' 
                                                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                                            }
                                        `}
                                    >
                                        {selectedFlight?._id === flight._id ? 'Selected' : 'Select'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedFlight && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Complete Your Booking
                    </h2>

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleBooking} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Class
                            </label>
                            <select
                                name="class"
                                value={bookingData.class}
                                onChange={(e) => setBookingData({ ...bookingData, class: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                    shadow-sm focus:border-blue-500 focus:ring-blue-500 
                                    dark:bg-gray-700 dark:text-white
                                    transition-colors duration-200"
                                required
                            >
                                <option value="Economy Class">Economy Class</option>
                                <option value="Business Class">Business Class</option>
                                <option value="First Class">First Class</option>
                            </select>
                        </div>

                        {/* Seat Map */}
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Select Your Seat
                            </h3>
                            <SeatMap
                                selectedClass={bookingData.class}
                                onSeatSelect={(seatNumber) => setBookingData(prev => ({ ...prev, seatNumber }))}
                                bookedSeats={[]} // You'll need to fetch booked seats
                            />
                        </div>

                        {/* Selected Seat Display */}
                        {bookingData.seatNumber && (
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Selected Seat
                                </h4>
                                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                    Seat {bookingData.seatNumber}
                                </p>
                            </div>
                        )}

                        {/* Total Price Display */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                Total Price
                            </h2>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${getPrice(selectedFlight, bookingData.class)}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !bookingData.seatNumber}
                            className={`
                                w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                                dark:hover:bg-blue-600 transition-colors duration-200
                                ${(!bookingData.seatNumber || loading) ? 
                                    'opacity-50 cursor-not-allowed' : 
                                    'hover:bg-blue-700'}
                            `}
                        >
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Book;