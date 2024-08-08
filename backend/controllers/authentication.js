const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        await User.create({ firstName, lastName, email, password });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        req.session.userId = user.id;
        req.session.isAuthenticated = true;

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};


// (async () => {
//     const email = 'ronniemyers@example.com'; // Replace with the actual email
//     const user = await User.findOne({ where: { email } });
//     if (user) {
//         console.log('Stored Hash:', user.password);
//     } else {
//         console.log('User not found');
//     }
// })();
// console.log('Received password:', password);
//         console.log('Stored hash:', user.password);