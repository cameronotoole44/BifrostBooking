import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import settingsCog from '../../assets/images/setting-cog.png';
import donegalSunset from '../../assets/images/donegal-sunset.jpg';

const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            alert('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/settings/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(passwordData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            alert('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${donegalSunset})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <img src={settingsCog} alt="Settings Cog" className="w-24 h-24 mr-4" />
                    <h1 className="text-4xl text-sky-950 font-bold">Settings</h1>
                </div>

                <div className="bg-sky-100 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl text-sky-950 font-bold mb-4">Update Info</h2>
                    <form onSubmit={handleSettingsSubmit}>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-sm font-medium text-sky-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-sm font-medium text-sky-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-sky-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-sky-400 text-thunder-50 hover:bg-rain-600 hover:text-salmon-200 font-bold py-2 px-4 rounded">
                            Update
                        </button>
                    </form>
                </div>

                <div className="bg-sky-100 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl text-sky-950 font-bold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-sky-700">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-sky-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-sky-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-water focus:border-water"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-sky-400 text-thunder-50 hover:bg-rain-600 hover:text-salmon-200 font-bold py-2 px-4 rounded">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Settings;