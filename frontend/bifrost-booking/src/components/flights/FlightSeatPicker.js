import React, { useState, useEffect } from 'react';

const FlightSeatPicker = ({ flightId, setSelectedSeat }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatData, setSeatData] = useState([]);

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/seats?flightId=${flightId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch seat data');
                }
                const data = await response.json();
                setSeatData(data);
            } catch (error) {
                console.error('Error fetching seat data:', error);
            }
        };

        if (flightId) {
            fetchSeatData();
        }
    }, [flightId]);

    useEffect(() => {
        if (selectedSeats.length > 0) {
            setSelectedSeat(selectedSeats[0]);
        } else {
            setSelectedSeat(null);
        }
    }, [selectedSeats, setSelectedSeat]);

    const toggleSeatSelection = (seat) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
                return prevSelectedSeats.filter((s) => s !== seat);
            } else {
                return [seat];
            }
        });
    };

    const getSeatStatus = (seatNumber) => {
        const seat = seatData.find(s => s.seatNumber === seatNumber);
        return seat ? seat.status : 'available';
    };

    const seats = [
        ['1A', '1B', '1C', '1D', '1E', '1F'],
        ['2A', '2B', '2C', '2D', '2E', '2F'],
        ['3A', '3B', '3C', '3D', '3E', '3F'],
        ['4A', '4B', '4C', '4D', '4E', '4F'],
        ['5A', '5B', '5C', '5D', '5E', '5F'],
    ];

    return (
        <div className="flex flex-col items-center px-4">
            <h1 className="text-2xl font-bold mb-6">Select Your Seat</h1>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col items-center space-y-2">
                        {row.map((seat) => {
                            const status = getSeatStatus(seat);
                            return (
                                <button
                                    key={seat}
                                    className={`w-12 h-12 text-center border rounded-md transition-colors duration-200
                                    ${status === 'reserved' ? 'bg-salmon-600 text-white cursor-not-allowed' : ''}
                                    ${status === 'available' && selectedSeats.includes(seat) ? 'bg-moss-300 text-moss-950' : ''}
                                    ${status === 'available' && !selectedSeats.includes(seat) ? 'bg-cloud text-smoke-700' : ''}
                                    hover:${status === 'available' ? 'bg-sky-300 hover:text-sky-950' : ''}`}
                                    onClick={() => status === 'available' && toggleSeatSelection(seat)}
                                    disabled={status === 'reserved'}
                                >
                                    {seat}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Selected Seats:</h2>
                <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p>
            </div>
        </div>
    );
};

export default FlightSeatPicker;





// import React, { useState } from 'react';
// import SeatMapCanvas from '@alisaitteke/seatmap-canvas-react';


// const FlightSeatPicker = () => {
//     const [selectedSeats, setSelectedSeats] = useState([]);

//     const handleSeatSelect = (seat) => {
//         // Add or remove seat from selected seats
//         setSelectedSeats((prevSelectedSeats) =>
//             prevSelectedSeats.includes(seat)
//                 ? prevSelectedSeats.filter((s) => s !== seat)
//                 : [...prevSelectedSeats, seat]
//         );
//     };

//     // Define seat map layout
//     const seatMapCanvas = [
//         {
//             rows: [
//                 {
//                     seats: [
//                         { id: '1A', isReserved: false },
//                         { id: '1B', isReserved: true },
//                         null, // Aisle
//                         { id: '1C', isReserved: false },
//                         { id: '1D', isReserved: false },
//                         null, // Aisle
//                         { id: '1E', isReserved: false },
//                         { id: '1F', isReserved: false }
//                     ]
//                 },
//                 {
//                     seats: [
//                         { id: '2A', isReserved: false },
//                         { id: '2B', isReserved: false },
//                         null, // Aisle
//                         { id: '2C', isReserved: false },
//                         { id: '2D', isReserved: true },
//                         null, // Aisle
//                         { id: '2E', isReserved: false },
//                         { id: '2F', isReserved: true }
//                     ]
//                 },
//                 // Add more rows as needed
//             ]
//         }
//     ];

//     return (
//         <div className="flex flex-col items-center">
//             <h1 className="text-2xl font-bold mb-6">Select Your Seat</h1>
//             <SeatMap
//                 seatMap={seatMap}
//                 selectedSeats={selectedSeats}
//                 onSeatSelect={handleSeatSelect}
//                 canvasStyle={{ width: '100%', maxWidth: '600px', height: '400px' }}
//                 seatStyle={{
//                     reserved: { fill: '#f44336' }, // Color for reserved seats
//                     available: { fill: '#4caf50' }, // Color for available seats
//                     selected: { fill: '#2196f3' } // Color for selected seats
//                 }}
//             />
//             <div className="mt-4">
//                 <h2 className="text-lg font-semibold">Selected Seats:</h2>
//                 <ul>
//                     {selectedSeats.map((seat) => (
//                         <li key={seat} className="text-sm">
//                             {seat}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default FlightSeatPicker;
