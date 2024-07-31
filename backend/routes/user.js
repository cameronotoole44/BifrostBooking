const express = require('express');
const router = express.Router();
const { getUserSettings, updateUserSettings, getUserBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/users');

router.get('/settings', getUserSettings);
router.put('/settings', updateUserSettings);
router.get('/bookings', getUserBookings);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;