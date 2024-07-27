const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/users');

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/bookings', getUserBookings);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;