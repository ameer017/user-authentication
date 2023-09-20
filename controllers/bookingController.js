const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const sendBookingData = require("../utils/sendBookingData");


const createBooking = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;

    // Validation
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill in all the required fields.");
  };

  const booking = await Booking.create({
    name, email, phone
  });

  const _id = booking._id;
  
  if(booking) {
    const {_id, name, email, phone, isBooked} = booking;

    // await sendBookingData(
    //   _id, name, email, phone
    // );

    res.status(201).json({
        _id,
        name,
        email,
        phone,
        isBooked
    });
  } else{
    res.status(400);
    throw new Error('Invalid booking data')
  }
});

const getBooking = asyncHandler(async(req, res) => {
  
    const booking = await Booking.findOne(req.params.name);

    if(booking) {
        const {_id, name, email, phone, isBooked} = booking;

    res.status(200).json({
        _id,
        name,
        email,
        phone,
        isBooked,
    });
    } else {
        res.status(404);
        throw new Error("Booking not found");
    }
});


const updateBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findOne(req.params.name);
  
    if (booking) {
      const { name, email, phone, isBooked } = booking;
  
      booking.email = email;
      booking.name = req.body.name || name;
      booking.phone = req.body.phone || phone;
      booking.isBooked = req.body.isBooked || isBooked;
  
      const updatedBooking = await booking.save();
  
      res.status(200).json({
        _id: updatedBooking._id,
        name: updatedBooking.name,
        email: updatedBooking.email,
        phone: updatedBooking.phone,
        isBooked: updatedBooking.isBooked,
      });
    } else {
      res.status(404);
      throw new Error("Booking not found");
    }
  });
  
  // Delete User
  const deleteBooking = asyncHandler(async (req, res) => {
    const booking = Booking.findById(req.params.id);
  
    if (!booking) {
      res.status(404);
      throw new Error("User not found");
    }
  
    await booking.deleteOne();
    res.status(200).json({
      message: "Booking deleted successfully",
    });
  });
  
  // Get Users
  const getBookings = asyncHandler(async (req, res) => {
    const booking = await Booking.find().sort("-createdAt");
    if (!booking) {
      res.status(500);
      throw new Error("Something went wrong");
    }
    res.status(200).json(booking);
  });


module.exports = {
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking,
    getBookings
}