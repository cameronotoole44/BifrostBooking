import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cloud-800">
            <div className="bg-cloud-400 p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl text-cloud-900 font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-cloud-950 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-cloud-950 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-cloud-950 text-sm font-bold mb-2" htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-cloud-950 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-cloud-600 hover:bg-moss-200 hover:text-cloud-700 text-moss-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;