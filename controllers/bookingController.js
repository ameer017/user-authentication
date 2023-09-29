const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const sendBookingData = require("../utils/sendBookingData");

const createBooking = asyncHandler(async(req, res) => {
  const { name, phone, from, time, bookingEmail} = req.body;

  if(!name || !phone || !from || !time) {
    res.status(400);
    throw new Error("Please, fill in all the required fields")
  }


  const booking = await Booking.create({
    name,
    phone,
    from,
    time,
    bookingEmail
  })


  if(booking) {
    const {_id, name,  phone, from, time, bookingEmail} = booking;

    res.status(201).json({
      _id, 
      name, 
      phone, 
      from, 
      time,
      bookingEmail
    })
  }
})

const getBooking = asyncHandler(async(req, res) => {
  
    const booking = await Booking.findOne(req.params.name);

    if(booking) {
        const {_id, name, phone, from, time, bookingEmail} = booking;

    res.status(200).json({
        _id,
        name,
        bookingEmail,
        phone,
        from, 
        time,
        bookingEmail
    });
    } else {
        res.status(404);
        throw new Error("Booking not found");
    }
});


const updateBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findOne(req.params.name);
  
    if (booking) {
      const { name, bookingEmail, phone,  from, time } = booking;
  
      booking.bookingEmail = bookingEmail;
      booking.name = req.body.name || name;
      booking.phone = req.body.phone || phone;
      booking.from = req.body.from || from;
      booking.time = req.body.time || time;
  
      const updatedBooking = await booking.save();
  
      res.status(200).json({
        _id: updatedBooking._id,
        name: updatedBooking.name,
        email: updatedBooking.email,
        phone: updatedBooking.phone,
        from: updatedBooking.from,
        time: updatedBooking.time
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
  
  // Get Bookings
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
    getBookings,
}