const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property', // Reference to the Property model
    },
    phone: {
      type: String,
      
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    bookingEmail: {
      type: String, 
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);


const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
