const express = require("express");
const { createBooking, getBooking, updateBooking, getBookings, deleteBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/create-booking', createBooking);
router.get('/get-booking-data', protect, getBooking);
router.patch('/update-booking', updateBooking);
router.get('/get-bookings', getBookings);
router.delete('/:id', protect, deleteBooking)

module.exports = router