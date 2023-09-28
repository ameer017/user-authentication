const asyncHandler = require("express-async-handler");
const Property = require("../models/propertyModel");
const nodemailer = require('nodemailer');
const User = require("../models/userModel");
const addPropertyEmail = require("../utils/addPropertyEmail");
const sendBookingConfirmationEmail = require("../utils/sendBookingConfirmationEmail");

const createProperty = asyncHandler(async(req, res) => {
  const {name, location, price, rooms, description, bathroom, car_park, photo, isBooked, propertyEmail } = req.body;

  if(
      !name || 
      !location || 
      !price || 
      !rooms || 
      !description || 
      !bathroom || 
      !car_park ||
      !propertyEmail

    ) {
    res.status(400)
    throw new Error("please, fill in all the required fields")
  }

  const property = await Property.create({
    name, 
    location, 
    price, 
    propertyEmail,
    rooms, 
    description, 
    bathroom, 
    car_park,
    photo,
    isBooked
  })

  if(property) {
    const {_id, name, location, price, rooms, propertyEmail, description, bathroom, car_park, photo, isBooked} = property;

    await addPropertyEmail(
      _id, 
      name, 
      location, 
      price, 
      rooms, 
      description, 
      bathroom, 
      car_park, 
      propertyEmail, 
      photo, 
      isBooked
    )

    res.status(201).json({
      _id: property._id,
      name, 
      location, 
      price, 
      rooms, 
      description, 
      bathroom, 
      car_park,
      photo,
      isBooked,
      propertyEmail
    })
  }
})

const getProperty = asyncHandler(async(req, res) => {
    const property = await Property.findOne(req.params.name);

    if(property) {
        const {_id, 
          name, 
          location, 
          price, 
          rooms, 
          description, 
          bathroom, 
          car_park, 
          photo, 
          isBooked, 
          propertyEmail
        } = property;

        

    res.status(200).json({
        _id, 
        name, 
        location, 
        price, 
        rooms, 
        description, 
        bathroom, 
        car_park, 
        propertyEmail, 
        photo, 
        isBooked
    });
    } else {
        res.status(404);
        throw new Error("Property not found");
    }
});


const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findOne(req.params.name);

  if (property) {
    const {
      name,
      location,
      price,
      rooms,
      description,
      bathroom,
      car_park,
      propertyEmail,
      photo,
      isBooked,
    } = property;

    property.name = name;
    property.propertyEmail = propertyEmail;
    property.location = req.body.location || location;
    property.price = req.body.price || price;
    property.rooms = req.body.rooms || rooms;
    property.description = req.body.description || description;
    property.bathroom = req.body.bathroom || bathroom;
    property.car_park = req.body.car_park || car_park;
    property.photo = req.body.photo || photo;
    property.isBooked = true

    const updatedProperty = await property.save();

    res.status(200).json({
      _id: updatedProperty._id,
      name: updatedProperty.name,
      location: updatedProperty.location,
      price: updatedProperty.price,
      rooms: updatedProperty.rooms,
      description: updatedProperty.description,
      bathroom: updatedProperty.bathroom,
      car_park: updatedProperty.car_park,
      photo: updatedProperty.photo,
      isBooked: updatedProperty.isBooked,
    });
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

  
  // Delete User
  const deleteProperty = asyncHandler(async (req, res) => {
    const property = Property.findOne(req.params.name);
  
    if (!property) {
      res.status(404);
      throw new Error("Property not found");
    }
  
    await property.deleteOne();
    res.status(200).json({
      message: "Property deleted successfully",
    });
  });
  
  // Get Users
  const getProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find().sort("-createdAt");
    if (!properties) {
      res.status(500);
      throw new Error("Something went wrong");
    }
    res.status(200).json(properties);
  });

  const reUpdateProperty = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

  try {
    // Find the property by its ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update isBooked to false
    property.isBooked = false;

    // Save the updated property
    await property.save();

    res.status(200).json({
      isBooked: property.isBooked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });
  
  
module.exports = {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    reUpdateProperty
}