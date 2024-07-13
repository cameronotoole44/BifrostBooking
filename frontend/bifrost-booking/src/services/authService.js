import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

const register = async (user) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

const getProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return response.data;
    }
    throw new Error('No user logged in');
};

const updateProfile = async (profile) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        const response = await axios.put(`${API_URL}/profile`, profile, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return response.data;
    }
    throw new Error('No user logged in');
};

const authService = {
    login,
    register,
    getProfile,
    updateProfile,
};

export default authService;