const requireAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access' });
};


const express = require('express');
const router = express.Router();

router.get('/dashboard', requireAuth, (req, res) => {
    res.json({ message: 'Welcome to your dashboard!' });
});

module.exports = router;
