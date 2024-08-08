import React, { useState, useEffect } from 'react';
import { FaPlane, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const EditBooking = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [flight, setFlight] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingId) {
            console.error('Booking ID is not available');
            return;
        }

        const fetchBookingAndFlight = async () => {
            try {
                const bookingResponse = await fetch(`http://localhost:5000/bookings/${bookingId}`);
                if (!bookingResponse.ok) throw new Error('Failed to fetch booking');
                const bookingData = await bookingResponse.json();
                setBooking(bookingData);

                const flightResponse = await fetch(`http://localhost:5000/flights/${bookingData.flightId}`);
                if (!flightResponse.ok) throw new Error('Failed to fetch flight');
                const flightData = await flightResponse.json();
                setFlight(flightData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchBookingAndFlight();
    }, [bookingId]);

    const handleDeleteBooking = async () => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete booking');
            alert('Booking deleted successfully');
            navigate('/bookings');
        } catch (error) {
            console.error('Error deleting booking:', error.message);
        }
    };

    const handleGoBack = () => {
        navigate('/bookings');
    };

    if (!booking || !flight) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-smoke-400">
            <div className="max-w-lg w-full p-6 bg-smoke-50 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-cloud-700">Booking Details</h1>
                <div className="space-y-4">
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaPlane className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Flight Number:</span>
                        <span>{flight.flightNumber || 'N/A'}</span>
                    </p>
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaDollarSign className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Price:</span>
                        <span>${flight.price ? Number(flight.price).toFixed(2) : 'N/A'}</span>
                    </p>
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaCalendarAlt className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Departure Date:</span>
                        <span>{flight.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}</span>
                    </p>
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaClock className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Time of Flight:</span>
                        <span>{flight.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                    </p>
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaClock className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Suggested Arrival Time:</span>
                        <span>{flight.departureTime ? new Date(new Date(flight.departureTime).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                    </p>

                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaMapMarkerAlt className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Departure Airport:</span>
                        <span>{flight.departureAirport || 'N/A'}</span>
                    </p>
                    <p className="text-base text-xl text-cloud-600 flex items-center">
                        <FaMapMarkerAlt className="inline-block mr-2 text-cloud-500" />
                        <span className="font-semibold mr-2">Arrival Airport:</span>
                        <span>{flight.arrivalAirport || 'N/A'}</span>
                    </p>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleDeleteBooking}
                        className="px-4 py-2 bg-salmon-500 text-smoke-50 rounded hover:bg-salmon-600 hover:text-smoke-200"
                    >
                        Delete Booking
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-sky-500 text-smoke-50 rounded hover:bg-sky-600 hover:text-smoke-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBooking;




// import React, { useState, useEffect } from 'react';
// import { FaPlane, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditBooking = () => {
//     const { bookingId } = useParams(); // Retrieve bookingId from URL params
//     const [booking, setBooking] = useState(null);
//     const [flight, setFlight] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!bookingId) {
//             console.error('Booking ID is not available');
//             return;
//         }

//         const fetchBookingAndFlight = async () => {
//             try {
//                 // Fetch booking details
//                 const bookingResponse = await fetch(`http://localhost:5000/bookings/${bookingId}`);
//                 if (!bookingResponse.ok) throw new Error('Failed to fetch booking');
//                 const bookingData = await bookingResponse.json();
//                 setBooking(bookingData);

//                 // Fetch flight details
//                 const flightResponse = await fetch(`http://localhost:5000/flights/${bookingData.flightId}`);
//                 if (!flightResponse.ok) throw new Error('Failed to fetch flight');
//                 const flightData = await flightResponse.json();
//                 setFlight(flightData);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//             }
//         };

//         fetchBookingAndFlight();
//     }, [bookingId]);

//     const handleDeleteBooking = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete booking');
//             alert('Booking deleted successfully');
//             navigate('/bookings');
//         } catch (error) {
//             console.error('Error deleting booking:', error.message);
//         }
//     };

//     const handleGoBack = () => {
//         navigate('/bookings');
//     };

//     if (!booking || !flight) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
//             <div className="bg-white p-6 rounded shadow-md">
//                 <p className="text-base mb-1">
//                     <FaPlane className="inline-block mr-2" />
//                     <span className="font-semibold">Flight Number:</span> {flight.flightNumber || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaDollarSign className="inline-block mr-2" />
//                     <span className="font-semibold">Price:</span> ${flight.price ? Number(flight.price).toFixed(2) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Time of Flight:</span> {flight.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Suggested Arrival Time:</span> {flight.departureTime ? new Date(new Date(flight.departureTime).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaCalendarAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Date:</span> {flight.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Airport:</span> {flight.departureAirport || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Arrival Airport:</span> {flight.arrivalAirport || 'N/A'}
//                 </p>
//                 <div className="mt-4">
//                     <button
//                         onClick={handleDeleteBooking}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Delete Booking
//                     </button>
//                     <button
//                         onClick={handleGoBack}
//                         className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditBooking;




// import React, { useState, useEffect } from 'react';
// import { FaPlane, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

// const EditBooking = () => {
//     const { bookingId } = useParams(); // Retrieve bookingId from URL params
//     const [booking, setBooking] = useState(null);
//     const [flight, setFlight] = useState(null);
//     const [passengerName, setPassengerName] = useState('');

//     useEffect(() => {
//         if (!bookingId) {
//             console.error('Booking ID is not available');
//             return;
//         }

//         const fetchBookingAndFlight = async () => {
//             try {
//                 // Fetch booking details
//                 const bookingResponse = await fetch(`http://localhost:5000/bookings/${bookingId}`);
//                 if (!bookingResponse.ok) throw new Error('Failed to fetch booking');
//                 const bookingData = await bookingResponse.json();
//                 setBooking(bookingData);
//                 setPassengerName(bookingData.passengerName);

//                 // Fetch flight details
//                 const flightResponse = await fetch(`http://localhost:5000/flights/${bookingData.flightId}`);
//                 if (!flightResponse.ok) throw new Error('Failed to fetch flight');
//                 const flightData = await flightResponse.json();
//                 setFlight(flightData);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//             }
//         };

//         fetchBookingAndFlight();
//     }, [bookingId]);

//     const handleEditBooking = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ passengerName }),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to update booking');
//             }
//             alert('Booking updated successfully');
//         } catch (error) {
//             console.error('Error updating booking:', error.message);
//         }
//     };

//     // Debugging: Log states to ensure they are being set
//     console.log('Booking:', booking);
//     console.log('Flight:', flight);

//     if (!booking || !flight) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
//             <div className="bg-white p-6 rounded shadow-md">
//                 <p className="text-base mb-1">
//                     <FaPlane className="inline-block mr-2" />
//                     <span className="font-semibold">Flight Number:</span> {flight.flightNumber || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaDollarSign className="inline-block mr-2" />
//                     <span className="font-semibold">Price:</span> ${flight.price ? Number(flight.price).toFixed(2) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Time of Flight:</span> {flight.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Suggested Arrival Time:</span> {flight.departureTime ? new Date(new Date(flight.departureTime).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaCalendarAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Date:</span> {flight.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Airport:</span> {flight.departureAirport || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Arrival Airport:</span> {flight.arrivalAirport || 'N/A'}
//                 </p>
//                 <div className="mt-4">
//                     <form onSubmit={handleEditBooking}>
//                         <div className="mb-4">
//                             <label htmlFor="passengerName" className="block text-sm font-medium">Passenger Name</label>
//                             <input
//                                 type="text"
//                                 id="passengerName"
//                                 value={passengerName}
//                                 onChange={(e) => setPassengerName(e.target.value)}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         >
//                             Update Booking
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditBooking;


// import React, { useState, useEffect } from 'react';
// import { FaPlane, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const EditBooking = ({ bookingId }) => {
//     const [booking, setBooking] = useState(null);
//     const [flight, setFlight] = useState(null);
//     const [passengerName, setPassengerName] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookingAndFlight = async () => {
//             try {
//                 // Fetch booking details
//                 const bookingResponse = await fetch(`http://localhost:5000/bookings/${bookingId}`);
//                 if (!bookingResponse.ok) throw new Error('Failed to fetch booking');
//                 const bookingData = await bookingResponse.json();
//                 setBooking(bookingData);
//                 setPassengerName(bookingData.passengerName);

//                 // Fetch flight details
//                 const flightResponse = await fetch(`http://localhost:5000/flights/${bookingData.flightId}`);
//                 if (!flightResponse.ok) throw new Error('Failed to fetch flight');
//                 const flightData = await flightResponse.json();
//                 setFlight(flightData);
//             } catch (error) {
//                 console.error('Error fetching data:', error.message);
//             }
//         };

//         fetchBookingAndFlight();
//     }, [bookingId]);

//     const handleDeleteBooking = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete booking');
//             alert('Booking deleted successfully');
//             navigate('/bookings');
//         } catch (error) {
//             console.error('Error deleting booking:', error.message);
//         }
//     };

//     const handleGoBack = () => {
//         navigate('/bookings');
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
//             <div className="bg-white p-6 rounded shadow-md">
//                 <p className="text-base mb-1">
//                     <FaPlane className="inline-block mr-2" />
//                     <span className="font-semibold">Flight Number:</span> {flight?.flightNumber || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaDollarSign className="inline-block mr-2" />
//                     <span className="font-semibold">Price:</span> ${flight?.price ? Number(flight.price).toFixed(2) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Time of Flight:</span> {flight?.departureTime ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaClock className="inline-block mr-2" />
//                     <span className="font-semibold">Suggested Arrival Time:</span> {flight?.departureTime ? new Date(new Date(flight.departureTime).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaCalendarAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Date:</span> {flight?.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Departure Airport:</span> {flight?.departureAirport || 'N/A'}
//                 </p>
//                 <p className="text-base mb-1">
//                     <FaMapMarkerAlt className="inline-block mr-2" />
//                     <span className="font-semibold">Arrival Airport:</span> {flight?.arrivalAirport || 'N/A'}
//                 </p>
//                 <div className="mt-4">
//                     <button
//                         onClick={handleDeleteBooking}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Delete Booking
//                     </button>
//                     <button
//                         onClick={handleGoBack}
//                         className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditBooking;