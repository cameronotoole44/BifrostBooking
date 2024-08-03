import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FlightDetails = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/flights/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlight(data);
            } catch (error) {
                setError('Failed to fetch flight details');
            } finally {
                setLoading(false);
            }
        };

        fetchFlightDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!flight) {
        return <div>No flight details found</div>;
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Flight Details</h1>
            <p className="text-sm"><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p className="text-sm"><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p className="text-sm"><strong>Arrival Time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p className="text-sm"><strong>Departure Airport:</strong> {flight.departureAirport}</p>
            <p className="text-sm"><strong>Arrival Airport:</strong> {flight.arrivalAirport}</p>
            <p className="text-sm"><strong>Price:</strong> ${flight.price}</p>
        </div>
    );
};

export default FlightDetails;