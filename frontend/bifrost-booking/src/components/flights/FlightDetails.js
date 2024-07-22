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
                const response = await fetch(`/flights/${id}`);
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
        <div>
            <h1>Flight Details</h1>
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
            <p><strong>Arrival Time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p><strong>Departure City:</strong> {flight.departureCity}</p>
            <p><strong>Arrival City:</strong> {flight.arrivalCity}</p>
        </div>
    );
};

export default FlightDetails;