const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CREATE USER //
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET ALL USERS //
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET SINGLE USER //
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE USER //
router.put('/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findByPk(req.params.id);

        if (user) {
            // IF PASSWORD IS GIVEN HASH IT //
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }

            //UPDATE FIELDS //
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;

            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE USER //
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

// ADMIN ACCESS FOR USER CRUD OPERATIONS //