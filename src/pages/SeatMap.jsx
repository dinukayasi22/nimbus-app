import { useState } from 'react';

const SeatMap = ({ selectedClass, onSeatSelect, bookedSeats = [] }) => {
    const [selectedSeat, setSelectedSeat] = useState(null);

    const defaultClass = 'Economy Class';
    const currentClass = selectedClass || defaultClass;

    // Updated seat configuration
    const seatConfig = {
        'First Class': {
            rows: 5,             // 4 seats × 5 rows = 20 seats
            seatsPerRow: 4,
            startRow: 1,
            prefix: 'F'
        },
        'Business Class': {
            rows: 5,             // 6 seats × 5 rows = 30 seats
            seatsPerRow: 6,
            startRow: 6,
            prefix: 'B'
        },
        'Economy Class': {
            rows: 10,            // 7 seats × 10 rows = 70 seats
            seatsPerRow: 7,
            startRow: 11,
            prefix: 'E'
        }
    };

    const currentConfig = seatConfig[currentClass];

    // Helper function to get seat letter
    const getSeatLetter = (index, config) => {
        // Skip 'I' to avoid confusion with '1'
        if (index >= 8) index++;
        return String.fromCharCode(65 + index);
    };

    const renderSeat = (rowIndex, seatIndex) => {
        const seatNumber = `${currentConfig.prefix}${rowIndex}-${getSeatLetter(seatIndex, currentConfig)}`;
        const isBooked = bookedSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;

        return (
            <button
                key={seatNumber}
                onClick={() => handleSeatClick(seatNumber)}
                disabled={isBooked}
                className={`
                    w-8 h-8 m-1 rounded-lg flex items-center justify-center text-xs
                    ${isBooked 
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                        : isSelected
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800'
                    }
                    transition-colors duration-200
                    ${currentClass === 'First Class' ? 'w-10 h-10 text-sm' : ''}
                `}
                title={isBooked ? 'Seat already booked' : seatNumber}
            >
                {seatNumber}
            </button>
        );
    };

    const handleSeatClick = (seatNumber) => {
        if (!bookedSeats.includes(seatNumber)) {
            setSelectedSeat(seatNumber);
            onSeatSelect(seatNumber);
        }
    };

    const getClassIndicator = () => {
        const seatCounts = {
            'First Class': '20 seats',
            'Business Class': '30 seats',
            'Economy Class': '70 seats'
        };
        return `${currentClass} (${seatCounts[currentClass]})`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <h3 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-4">
                {getClassIndicator()}
            </h3>
            
            {/* Plane outline */}
            <div className="relative bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl mb-6">
                
                {/* Seat grid */}
                <div className="space-y-4">
                    {Array.from({ length: currentConfig.rows }).map((_, rowIndex) => (
                        <div 
                            key={rowIndex} 
                            className="flex justify-center items-center space-x-4"
                        >
                            {/* Row number */}
                            <div className="w-6 text-sm text-gray-500 dark:text-gray-400">
                                {currentConfig.startRow + rowIndex}
                            </div>

                            {/* Left side seats */}
                            <div className="flex">
                                {Array.from({ length: Math.floor(currentConfig.seatsPerRow / 2) }).map((_, seatIndex) => 
                                    renderSeat(currentConfig.startRow + rowIndex, seatIndex)
                                )}
                            </div>
                            
                            {/* Aisle */}
                            <div className="w-8 h-10 bg-gray-200 dark:bg-gray-700"></div>
                            
                            {/* Right side seats */}
                            <div className="flex">
                                {Array.from({ length: Math.ceil(currentConfig.seatsPerRow / 2) }).map((_, seatIndex) => 
                                    renderSeat(
                                        currentConfig.startRow + rowIndex, 
                                        seatIndex + Math.floor(currentConfig.seatsPerRow / 2)
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Class information */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                Total seats in {currentClass}: {currentConfig.rows * currentConfig.seatsPerRow}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">Booked</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">Selected</span>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;