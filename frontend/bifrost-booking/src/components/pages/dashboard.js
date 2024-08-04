import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import morningImage from "../../assets/images/morning.jpg";
import afternoonImage from "../../assets/images/afternoon.jpg";
import eveningImage from "../../assets/images/mountEverest.jpg";

const Dashboard = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
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

        return () => clearInterval(timer);
    }, [currentTime]);

    const formattedTime = format(currentTime, "hh:mm a");
    const formattedDate = format(currentTime, "do MMMM yyyy");

    if (!currentUser) {
        return <div>Loading...</div>;
    }

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
            textColor: "text-moss-950",
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

    // DEFAULT TO MORNING IF TOD IS NOT SET RIGHT //
    const styles = dynamicStyles[timeOfDay] || dynamicStyles.morning;

    return (
        <div className={`p-4 min-h-screen ${styles.pageBackground}`}>
            <div
                className={`relative p-4 mb-6 bg-cover bg-center rounded-lg ${styles.headerBackground} flex flex-col sm:flex-row justify-between items-center`}
                style={{ backgroundImage: backgroundImage[timeOfDay] }}
            >
                <div className="absolute inset-0 bg-coal opacity-45 rounded-lg"></div>

                <div className="relative text-center sm:text-left">
                    <h1
                        className={`text-2xl sm:text-3xl font-bold mb-2 ${styles.textColorDay} drop-shadow-md`}
                    >
                        Good {timeOfDay}, {currentUser.firstName}!
                    </h1>
                </div>
                <div className="relative text-center sm:text-right mt-2 sm:mt-0">
                    <p className={`text-base sm:text-lg ${styles.textColorTime} drop-shadow-md`}>
                        It is currently {formattedTime} on {formattedDate}.
                    </p>
                </div>
            </div>
            <div className={`controlBar p-4 shadow-md rounded-lg ${styles.settingsBackground}`}>
                <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${styles.textColor}`}>
                    Manage Your Account
                </h2>
                <Link to="/settings" className={`hover:underline block mb-2 ${styles.textColor}`}>
                    Update Profile Settings
                </Link>
                <Link to="/bookings" className={`hover:underline ${styles.textColor}`}>
                    Manage Bookings
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

