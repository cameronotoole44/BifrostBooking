import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../actions/userActions';
import aurora from '../../assets/images/aurora.jpg';
import loginIcon from '../../assets/images/login_icon.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    return (
        <div style={{ backgroundImage: `url(${aurora})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-smoke-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-sky-400"> <img src={loginIcon} alt="Login Icon" className="w-24 h-24 mr-4" /> </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full p-3 border border-moss-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-300"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="w-full p-3 border border-moss-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-smoke-100 text-coal p-3 rounded-lg hover:bg-moss-300 focus:outline-none focus:ring-2 focus:ring-sunrise-800"
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    {error && <p className="text-salmon-800 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
