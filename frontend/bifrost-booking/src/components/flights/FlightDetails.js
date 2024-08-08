import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUser";
import { useNavigate } from "react-router-dom";
import FlightSeatPicker from "./FlightSeatPicker";

const FlightDetails = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [passengerName, setPassengerName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/flights/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setFlight(data);
            } catch (error) {
                setError("Failed to fetch flight details");
            } finally {
                setLoading(false);
            }
        };

        fetchFlightDetails();
    }, [id]);

    useEffect(() => {
        if (currentUser) {
            const fullName = `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim();
            setPassengerName(fullName);
        }
    }, [currentUser]);

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        if (!selectedSeat) {
            setBookingStatus({ type: "error", message: "Please select a seat" });
            return;
        }
        const requestData = {
            userId: currentUser.id,
            flightId: id,
            seatNumber: selectedSeat,
            bookingDate: new Date().toISOString()
        };
        console.log('Request Data:', requestData);

        try {
            const response = await fetch("http://localhost:5000/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            // Read the response body once
            const responseData = await response.json();

            console.log('Response Status:', response.status);
            console.log('Response Data:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || "Booking creation failed");
            }

            setBookingStatus({
                type: "success",
                message: "Booking created successfully!",
            });
            navigate("/bookings");
        } catch (error) {
            setBookingStatus({ type: "error", message: error.message });
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                {error}
            </div>
        );
    }

    if (!flight) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                No flight details found
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="max-w-xl w-full mx-auto p-6 bg-smoke-200 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-smoke-900">
                    Flight Details
                </h1>
                <div className="space-y-3">
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Airline:</span> {flight.airline}
                    </p>
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Flight Number:</span> {flight.flightNumber}
                    </p>
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Departure:</span> {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} from {flight.departureAirport}
                    </p>
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Arrival:</span> {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} at {flight.arrivalAirport}
                    </p>
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Duration:</span> {flight.duration}
                    </p>
                    <p className="text-base font-semibold text-smoke-900">
                        <span className="font-bold text-xl text-sky-500">Price:</span> ${Number(flight.price).toFixed(2)}
                    </p>
                </div>

                <FlightSeatPicker flightId={id} setSelectedSeat={setSelectedSeat} />

                <form onSubmit={handleCreateBooking} className="mt-6">
                    <h2 className="text-xl font-bold mb-4 text-smoke-900">
                        Book This Flight
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="passengerName" className="block text-base font-semibold text-smoke-900 mb-1">
                            Passenger Name
                        </label>
                        <input
                            id="passengerName"
                            value={passengerName}
                            onChange={(e) => setPassengerName(e.target.value)}
                            className="w-full px-3 py-2 border border-smoke-300 rounded-md shadow-sm focus:ring focus:ring-smoke-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-cloud-500 text-cloud-50 font-medium rounded-md shadow-sm hover:bg-cloud-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sand-400"
                    >
                        Book Flight
                    </button>
                    {bookingStatus && (
                        <p
                            className={`mt-4 text-center ${bookingStatus.type === "error" ? "text-salmon-500" : "text-moss-500"
                                }`}
                        >
                            {bookingStatus.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FlightDetails;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCurrentUser } from "../../contexts/CurrentUser";
// import { useNavigate } from "react-router-dom";
// import SeatPicker from "./FlightSeatPicker";

// const FlightDetails = () => {
//     const { id } = useParams();
//     const [flight, setFlight] = useState(null);
//     const [passengerName, setPassengerName] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [bookingStatus, setBookingStatus] = useState(null);
//     const { currentUser } = useCurrentUser();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFlightDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/flights/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 const data = await response.json();
//                 setFlight(data);
//             } catch (error) {
//                 setError("Failed to fetch flight details");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFlightDetails();
//     }, [id]);

//     useEffect(() => {
//         if (currentUser) {
//             const fullName = `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim();
//             setPassengerName(fullName);
//         }
//     }, [currentUser]);

//     const handleCreateBooking = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/bookings", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     userId: currentUser.id,
//                     flightId: id,
//                     bookingDate: new Date().toISOString()
//                 }),
//             });
//             if (!response.ok) {
//                 throw new Error("Booking creation failed");
//             }
//             const data = await response.json();
//             setBookingStatus({
//                 type: "success",
//                 message: "Booking created successfully!",
//             });
//             navigate("/bookings");
//         } catch (error) {
//             setBookingStatus({ type: "error", message: error.message });
//         }
//     };


//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div>Loading...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 {error}
//             </div>
//         );
//     }

//     if (!flight) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 No flight details found
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col min-h-screen justify-center items-center">
//             <div className="max-w-xl w-full mx-auto p-6 bg-smoke-200 shadow-lg rounded-lg">
//                 <h1 className="text-2xl font-bold mb-6 text-center text-smoke-900">
//                     Flight Details
//                 </h1>
//                 <div className="space-y-3">
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Airline:</span> {flight.airline}
//                     </p>
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Flight Number:</span> {flight.flightNumber}
//                     </p>
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Departure:</span> {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} from {flight.departureAirport}
//                     </p>
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Arrival:</span> {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} at {flight.arrivalAirport}
//                     </p>
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Duration:</span> {flight.duration}
//                     </p>
//                     <p className="text-base font-semibold text-smoke-900">
//                         <span className="font-bold text-xl text-sky-500">Price:</span> ${Number(flight.price).toFixed(2)}
//                     </p>
//                 </div>

//                 <form onSubmit={handleCreateBooking} className="mt-6">
//                     <h2 className="text-xl font-bold mb-4 text-smoke-900">
//                         Book This Flight
//                     </h2>
//                     <div className="mb-4">
//                         <label htmlFor="passengerName" className="block text-base font-semibold text-smoke-900 mb-1">
//                             Passenger Name
//                         </label>
//                         <input
//                             id="passengerName"
//                             value={passengerName}
//                             onChange={(e) => setPassengerName(e.target.value)}
//                             className="w-full px-3 py-2 border border-smoke-300 rounded-md shadow-sm focus:ring focus:ring-smoke-300"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 bg-cloud-500 text-cloud-50 font-medium rounded-md shadow-sm hover:bg-cloud-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sand-400"
//                     >
//                         Book Flight
//                     </button>
//                     {bookingStatus && (
//                         <p
//                             className={`mt-4 text-center ${bookingStatus.type === "error" ? "text-red-500" : "text-green-500"
//                                 }`}
//                         >
//                             {bookingStatus.message}
//                         </p>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FlightDetails;


