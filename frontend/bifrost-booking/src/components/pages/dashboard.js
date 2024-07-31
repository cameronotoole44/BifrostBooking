import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import morningImage from '../../assets/images/morning.jpg';
import afternoonImage from '../../assets/images/afternoon.jpg';
import eveningImage from '../../assets/images/evening.jpg';

const Dashboard = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateGreeting = () => {
            const hour = currentTime.getHours();
            if (hour < 12) {
                setTimeOfDay('morning');
            } else if (hour < 18) {
                setTimeOfDay('afternoon');
            } else {
                setTimeOfDay('evening');
            }
        };

        updateGreeting();
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, [currentTime]);

    const formattedTime = format(currentTime, 'hh:mm a');
    const formattedDate = format(currentTime, 'do MMMM yyyy');

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const backgroundImage = {
        morning: `url(${morningImage})`,
        afternoon: `url(${afternoonImage})`,
        evening: `url(${eveningImage})`
    };

    const dynamicStyles = {
        morning: {
            pageBackground: 'bg-salmon-200',
            textColor: 'text-cloud-800',
            headerBackground: 'bg-cloud-300',
            settingsBackground: 'bg-cloud-500'
        },
        afternoon: {
            pageBackground: 'bg-moss-900',
            textColor: 'text-sand-400',
            headerBackground: 'bg-moss-300',
            settingsBackground: 'bg-moss-700'
        },
        evening: {
            pageBackground: 'bg-leather-950',
            textColor: 'text-leather-50',
            headerBackground: 'bg-leather-400',
            settingsBackground: 'bg-leather-700'
        }
    };

    // DEFAULT TO MORNING IF TOD IS NOT SET RIGHT //
    const styles = dynamicStyles[timeOfDay] || dynamicStyles.morning;

    return (
        <div className={`p-6 min-h-screen ${styles.pageBackground}`}>
            <div
                className={`p-6 mb-8 bg-cover bg-center rounded-lg ${styles.headerBackground} flex justify-between items-center`}
                style={{ backgroundImage: backgroundImage[timeOfDay] }}
            >
                <div>
                    <h1 className={`text-3xl font-bold mb-4 ${styles.textColor}`}>
                        Good {timeOfDay}, {currentUser.firstName}!
                    </h1>
                </div>
                <div className="text-right">
                    <p className={`text-lg ${styles.textColor}`}>
                        It is currently {formattedTime} on {formattedDate}.
                    </p>
                </div>
            </div>
            <div className={`controlBar p-6 shadow-md rounded-lg ${styles.settingsBackground}`}>
                <h2 className={`text-2xl font-semibold mb-4 ${styles.textColor}`}>Account Settings</h2>
                <Link to="/profile" className={`hover:underline block mb-2 ${styles.textColor}`}>
                    Update Profile
                </Link>
                <Link to="/bookings" className={`hover:underline ${styles.textColor}`}>
                    Manage Bookings
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

