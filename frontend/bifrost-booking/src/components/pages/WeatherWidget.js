import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:5000/weather/${city}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="weather-widget p-4 rounded-lg shadow-md flex flex-col items-center">
            <h4 className="font-semibold text-smoke-950 text-lg mb-2">{weatherData.city_name}</h4>
            <div className="flex items-center justify-center">
                <img
                    src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
                    alt={weatherData.weather.description}
                    className="w-20 h-20 mr-2"
                />
                <p className="text-xl text-smoke-950 font-semibold">{weatherData.temp}°C</p>
            </div>
            <p>{weatherData.weather.description}</p>
        </div>
    );
};

export default WeatherWidget;