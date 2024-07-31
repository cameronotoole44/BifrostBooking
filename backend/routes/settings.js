const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.put('/', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.id;

    try {
        await User.update({ firstName, lastName, email }, {
            where: { id: userId }
        });
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating settings' });
    }
});

router.put('/password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId);
        const match = await bcrypt.compare(currentPassword, user.password);

        if (!match) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await User.update({ password: hashedPassword }, {
            where: { id: userId }
        });
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing password' });
    }
});

module.exports = router;
