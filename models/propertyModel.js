const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
      name: {
        type: String,
        required: true
      },    
      photo: {
        type: String,
        // required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      location: {
          type: String,
          required: true
        },
        price: {
            type: String,
            required: true
        },
        rooms: {
            type: String,
            required: true
        },
        description: {
          type: String,
          required: true,
        },
        bathroom: {
          type: String,
          required: true,
        },
        car_park: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          // required: [true, "Please add an email"],
          unique: true,
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


const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
