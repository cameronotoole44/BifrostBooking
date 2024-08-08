import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBookings } from "../../actions/bookingActions";
import morningImage from "../../assets/images/morning.jpg";
import afternoonImage from "../../assets/images/afternoon.jpg";
import eveningImage from "../../assets/images/mountEverest.jpg";
import takeOffIcon from '../../assets/images/flight.png';
import statIcon from '../../assets/images/stat-icon.png';
import WeatherWidget from "./WeatherWidget";

const Dashboard = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser?.id;
    const { bookings = [], loading, error } = useSelector((state) => state.bookings);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateGreeting = () => {
            const hour = currentTime.getHours();
            if (hour < 12) {
                setTimeOfDay("morning");
            } else if (hour < 18) {
                setTimeOfDay("afternoon");
            } else {
                setTimeOfDay("evening");
            }
        };

        updateGreeting();
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        if (userId) {
            dispatch(fetchBookings(userId));
        }

        return () => clearInterval(timer);
    }, [currentTime, dispatch, userId]);

    const formattedTime = format(currentTime, "hh:mm a");
    const formattedDate = format(currentTime, "do MMMM yyyy");

    const backgroundImage = {
        morning: `url(${morningImage})`,
        afternoon: `url(${afternoonImage})`,
        evening: `url(${eveningImage})`,
    };

    const dynamicStyles = {
        morning: {
            pageBackground: "bg-sunrise-700",
            textColor: "text-sunrise-950",
            textColorDay: "text-sunrise-300",
            textColorTime: "text-sunrise-300",
            headerBackground: "bg-sunrise-300",
            settingsBackground: "bg-sunrise-500",
        },
        afternoon: {
            pageBackground: "bg-moss-900",
            textColor: "text-smoke-950",
            textColorDay: "text-sand-400",
            textColorTime: "text-sand-300",
            headerBackground: "bg-moss-300",
            settingsBackground: "bg-moss-300",
        },
        evening: {
            pageBackground: "bg-cloud-950",
            textColor: "text-cloud-50",
            textColorDay: "text-cloud-200",
            textColorTime: "text-cloud-200",
            headerBackground: "bg-cloud-400",
            settingsBackground: "bg-cloud-700",
        },
    };

    const currentStyles = dynamicStyles[timeOfDay] || dynamicStyles.morning;

    // THIS GRABS THE TWO CLOSEST BOOKINGS TO DISPLAY //
    const getUpcomingBookings = () => {
        const now = new Date();
        console.log("Current Time:", now);

        const futureBookings = bookings
            .filter((booking) => {
                const flight = booking.flight;

                if (!flight) {
                    console.log("No flight data for booking:", booking);
                    return false;
                }

                const departureTimeStr = flight.departureTime;
                if (!departureTimeStr) {
                    console.log("Missing departureTime for booking:", booking);
                    return false;
                }

                const flightDeparture = new Date(departureTimeStr);
                if (isNaN(flightDeparture.getTime())) {
                    console.log("Invalid Flight Departure:", departureTimeStr);
                    return false;
                }

                console.log("Flight Departure:", flightDeparture);
                return flightDeparture > now;
            })
            .sort((a, b) => new Date(a.flight.departureTime) - new Date(b.flight.departureTime));

        console.log("Future Bookings:", futureBookings);

        return futureBookings.slice(0, 2);
    };

    const upcomingBookings = getUpcomingBookings();

    // CALCULATE TOTAL DISTANCE TRAVELED // 
    const averageSpeedKmH = 800; // AVERAGE COMMERCIAL FLIGHT SPEED //
    const now = new Date(); // CURRENT TIME //

    const totalDistanceTraveled = bookings.reduce((total, booking) => {
        const departureTime = new Date(booking.flight.departureTime);
        const arrivalTime = new Date(booking.flight.arrivalTime);

        if (arrivalTime <= now) {
            const flightDurationHours = (arrivalTime - departureTime) / (1000 * 60 * 60);
            return total + (flightDurationHours * averageSpeedKmH || 0);
        }

        return total;
    }, 0);

    // CALCULATES MOST FREQUENT DESTINATION //
    const destinationCount = bookings.reduce((acc, booking) => {
        const destination = booking.flight?.arrivalCity || 'Unknown';
        acc[destination] = (acc[destination] || 0) + 1;
        return acc;
    }, {});

    const frequentDestination = Object.keys(destinationCount).reduce((a, b) =>
        destinationCount[a] > destinationCount[b] ? a : b, 'None'
    );

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`p-4 min-h-screen ${currentStyles.pageBackground} flex justify-center items-center`}>
            <div className="w-full max-w-4xl space-y-6">
                <div
                    className={`relative p-4 mb-6 bg-cover bg-center rounded-lg ${currentStyles.headerBackground} flex flex-col sm:flex-row justify-center items-center text-center`}
                    style={{ backgroundImage: backgroundImage[timeOfDay] }}
                >
                    <div className="absolute inset-0 bg-coal opacity-45 rounded-lg"></div>

                    <div className="relative">
                        <h1
                            className={`text-2xl sm:text-3xl font-bold mb-2 ${currentStyles.textColorDay} drop-shadow-md`}
                        >
                            Good {timeOfDay}, {currentUser.firstName}!
                        </h1>
                    </div>
                    <div className="relative mt-2 sm:mt-0">
                        <p className={`text-base sm:text-lg ${currentStyles.textColorTime} drop-shadow-md`}>
                            It is currently {formattedTime} on {formattedDate}.
                        </p>
                    </div>
                </div>

                <div className={`controlBar p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
                    <h2 className={`text-xl sm:text-3xl font-bold mb-4 ${currentStyles.textColor}`}>
                        Account
                    </h2>
                    <Link to="/settings" className={`hover:underline block sm:text-2xl font-semi-bold mb-2 ${currentStyles.textColor}`}>
                        Profile Settings
                    </Link>
                    <Link to="/bookings" className={`hover:underline sm:text-2xl font-semi-bold ${currentStyles.textColor}`}>
                        Manage Bookings
                    </Link>
                </div>

                {/* Upcoming Bookings Section */}
                <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
                    <h3 className={`text-lg sm:text-2xl font-semibold mb-4 ${currentStyles.textColor}`}>
                        Upcoming Trips:
                    </h3>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-salmon-500">{error}</p>}
                    {upcomingBookings.length === 0 ? (
                        <p>No upcoming bookings found</p>
                    ) : (
                        <div className="space-y-2">
                            {upcomingBookings.map((booking) => {
                                const flight = booking.flight || {};
                                const departureDate = new Date(flight.departureTime);
                                return (
                                    <div
                                        key={booking.id}
                                        className={`shadow-sm ${currentStyles.textColor} flex flex-col items-center p-4`}
                                    >
                                        <img src={takeOffIcon} alt="takeoff icon" className="w-24 h-24 mb-2" />
                                        <div className="text-center">
                                            <p className="sm:text-2xl font-semibold">{flight.arrivalAirport || 'N/A'}</p>
                                            <p className="sm:text-2xl font-semibold">
                                                {flight.departureTime ? format(departureDate, 'PP') : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Weather Information Section */}
                <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
                    <h3 className={`text-lg sm:text-2xl font-semibold mb-4 ${currentStyles.textColor}`}>
                        Weather
                    </h3>
                    <div className="space-y-2 flex justify-center">
                        {upcomingBookings.map((booking) => (
                            <WeatherWidget
                                key={booking.id}
                                city={booking.flight.arrivalCity}
                            />
                        ))}
                    </div>
                </div>

                {/* Travel Statistics Section */}
                <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
                    <h3 className={`text-lg sm:text-2xl font-semibold mb-4 ${currentStyles.textColor}`}>
                        Travel Statistics <img src={statIcon} alt="stat icon" className="w-24 h-24 mb-2 mx-auto" />
                    </h3>
                    <div className="space-y-2">
                        <p className="sm:text-xl text-smoke-950 font-semibold mb-4">Total Flights: {bookings.length}</p>
                        <p className="sm:text-xl text-smoke-950 font-semibold mb-4">Total Distance Traveled: {totalDistanceTraveled} km</p>
                        <p className="sm:text-xl text-smoke-950 font-semibold mb-4">Frequent Destination: {frequentDestination}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;





// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchBookings } from "../../actions/bookingActions";
// import morningImage from "../../assets/images/morning.jpg";
// import afternoonImage from "../../assets/images/afternoon.jpg";
// import eveningImage from "../../assets/images/mountEverest.jpg";
// import takeOffIcon from '../../assets/images/flight.png';
// import statIcon from '../../assets/images/stat-icon.png';
// import WeatherWidget from "./WeatherWidget";

// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const currentUser = useSelector((state) => state.user.currentUser);
//     const userId = currentUser?.id;
//     const { bookings = [], loading, error } = useSelector((state) => state.bookings);
//     const [timeOfDay, setTimeOfDay] = useState("");
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         const updateGreeting = () => {
//             const hour = currentTime.getHours();
//             if (hour < 12) {
//                 setTimeOfDay("morning");
//             } else if (hour < 18) {
//                 setTimeOfDay("afternoon");
//             } else {
//                 setTimeOfDay("evening");
//             }
//         };

//         updateGreeting();
//         const timer = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 60000);

//         if (userId) {
//             dispatch(fetchBookings(userId));
//         }

//         return () => clearInterval(timer);
//     }, [currentTime, dispatch, userId]);

//     const formattedTime = format(currentTime, "hh:mm a");
//     const formattedDate = format(currentTime, "do MMMM yyyy");

//     const backgroundImage = {
//         morning: `url(${morningImage})`,
//         afternoon: `url(${afternoonImage})`,
//         evening: `url(${eveningImage})`,
//     };

//     const dynamicStyles = {
//         morning: {
//             pageBackground: "bg-sunrise-700",
//             textColor: "text-sunrise-950",
//             textColorDay: "text-sunrise-300",
//             textColorTime: "text-sunrise-300",
//             headerBackground: "bg-sunrise-300",
//             settingsBackground: "bg-sunrise-500",
//         },
//         afternoon: {
//             pageBackground: "bg-moss-900",
//             textColor: "text-smoke-950",
//             textColorDay: "text-sand-400",
//             textColorTime: "text-sand-300",
//             headerBackground: "bg-moss-300",
//             settingsBackground: "bg-moss-300",
//         },
//         evening: {
//             pageBackground: "bg-cloud-950",
//             textColor: "text-cloud-50",
//             textColorDay: "text-cloud-200",
//             textColorTime: "text-cloud-200",
//             headerBackground: "bg-cloud-400",
//             settingsBackground: "bg-cloud-700",
//         },
//     };

//     const currentStyles = dynamicStyles[timeOfDay] || dynamicStyles.morning;

//     // THIS GRABS THE TWO CLOSEST BOOKINGS TO DISPLAY //
//     const getUpcomingBookings = () => {
//         const now = new Date();
//         console.log("Current Time:", now);

//         const futureBookings = bookings
//             .filter((booking) => {
//                 const flight = booking.flight;

//                 if (!flight) {
//                     console.log("No flight data for booking:", booking);
//                     return false;
//                 }

//                 const departureTimeStr = flight.departureTime;
//                 if (!departureTimeStr) {
//                     console.log("Missing departureTime for booking:", booking);
//                     return false;
//                 }

//                 const flightDeparture = new Date(departureTimeStr);
//                 if (isNaN(flightDeparture.getTime())) {
//                     console.log("Invalid Flight Departure:", departureTimeStr);
//                     return false;
//                 }

//                 console.log("Flight Departure:", flightDeparture);
//                 return flightDeparture > now;
//             })
//             .sort((a, b) => new Date(a.flight.departureTime) - new Date(b.flight.departureTime));

//         console.log("Future Bookings:", futureBookings);

//         return futureBookings.slice(0, 2);
//     };

//     const upcomingBookings = getUpcomingBookings();

//     if (!currentUser) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className={`p-4 min-h-screen ${currentStyles.pageBackground} flex justify-center items-center`}>
//             <div className="w-full max-w-4xl space-y-6">
//                 <div
//                     className={`relative p-4 mb-6 bg-cover bg-center rounded-lg ${currentStyles.headerBackground} flex flex-col sm:flex-row justify-center items-center text-center`}
//                     style={{ backgroundImage: backgroundImage[timeOfDay] }}
//                 >
//                     <div className="absolute inset-0 bg-coal opacity-45 rounded-lg"></div>

//                     <div className="relative">
//                         <h1
//                             className={`text-2xl sm:text-3xl font-bold mb-2 ${currentStyles.textColorDay} drop-shadow-md`}
//                         >
//                             Good {timeOfDay}, {currentUser.firstName}!
//                         </h1>
//                     </div>
//                     <div className="relative mt-2 sm:mt-0">
//                         <p className={`text-base sm:text-lg ${currentStyles.textColorTime} drop-shadow-md`}>
//                             It is currently {formattedTime} on {formattedDate}.
//                         </p>
//                     </div>
//                 </div>

//                 <div className={`controlBar p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
//                     <h2 className={`text-xl sm:text-3xl font-bold mb-4 ${currentStyles.textColor}`}>
//                         Account
//                     </h2>
//                     <Link to="/settings" className={`hover:underline block sm:text-2xl font-semi-bold mb-2 ${currentStyles.textColor}`}>
//                         Profile Settings
//                     </Link>
//                     <Link to="/bookings" className={`hover:underline sm:text-2xl font-semi-bold ${currentStyles.textColor}`}>
//                         Manage Bookings
//                     </Link>
//                 </div>

//                 {/* Upcoming Bookings Section */}
//                 <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
//                     <h3 className={`text-lg sm:text-2xl font-semibold mb-4 ${currentStyles.textColor}`}>
//                         Upcoming Trips:
//                     </h3>
//                     {loading && <p>Loading...</p>}
//                     {error && <p className="text-salmon-500">{error}</p>}
//                     {upcomingBookings.length === 0 ? (
//                         <p>No upcoming bookings found</p>
//                     ) : (
//                         <div className="space-y-2">
//                             {upcomingBookings.map((booking) => {
//                                 const flight = booking.flight || {};
//                                 const departureDate = new Date(flight.departureTime);
//                                 return (
//                                     <div
//                                         key={booking.id}
//                                         className={`shadow-sm ${currentStyles.textColor} flex flex-col items-center p-4`}
//                                     >
//                                         <img src={takeOffIcon} alt="takeoff icon" className="w-24 h-24 mb-2" />
//                                         <div className="text-center">
//                                             <p className="sm:text-2xl font-semibold">{flight.arrivalAirport || 'N/A'}</p>
//                                             <p className="sm:text-2xl font-semibold">
//                                                 {flight.departureTime ? format(departureDate, 'PP') : 'N/A'}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>

//                 {/* Weather Information Section */}
//                 <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
//                     <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${currentStyles.textColor}`}>
//                         Weather
//                     </h3>
//                     <div className="space-y-2 flex justify-center">
//                         {upcomingBookings.map((booking) => (
//                             <WeatherWidget
//                                 key={booking.id}
//                                 city={booking.flight.arrivalCity}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Travel Statistics Section */}
//                 <div className={`mt-6 p-4 shadow-md rounded-lg ${currentStyles.settingsBackground} text-center`}>
//                     <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${currentStyles.textColor}`}>
//                         Travel Statistics <img src={statIcon} alt="stat icon" className="w-24 h-24 mb-2 mx-auto" />
//                     </h3>
//                     <div className="space-y-2">
//                         <p>Total Flights: {bookings.length}</p>
//                         <p>Total Distance Traveled: 25,000 km</p>
//                         <p>Frequent Destination: Gotham</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;