import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-rain-50">
            <div className="bg-nightshade-200 p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-rain-900">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-rain-700">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-rain-700">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-rain-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500 sm:text-sm" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-rain-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-rain-400 rounded-md shadow-sm focus:outline-none focus:ring-rain-500 focus:border-rain-500 sm:text-sm" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-thunder-600 text-thunder-50 font-bold rounded-md shadow-sm hover:bg-thunder-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thunder-500">Register</button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-rain-700 hover:text-rain-900">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    )
};

export default Register;
