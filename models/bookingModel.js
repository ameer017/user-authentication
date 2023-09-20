const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);


const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
