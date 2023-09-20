const asyncHandler = require("express-async-handler");
const Property = require("../models/propertyModel");
const addPropertyEmail = require("../utils/addPropertyEmail");


const createProperty = asyncHandler(async(req, res) => {
    const {name, location, price, rooms, description, bathroom, car_park, email, photo} = req.body;

    // Validation
  if (!name || !location || !price || !rooms || !description || !bathroom || !car_park || !email || photo) {
    res.status(400);
    throw new Error("Please fill in all the required fields.");
  };

  const property = await Property.create({
    name, location, price, rooms, description, bathroom, car_park, photo
  });

  const _id = property._id;
  
  if(property) {
    const {_id, name, location, price, rooms, description, bathroom, car_park, email, photo} = property;

    // await addPropertyEmail(
    //   _id, name, location, price, rooms, description, bathroom, car_park, email, duration, photo
    // )

    res.status(201).json({
        _id,
        name,
        location, 
        price, 
        rooms, 
        description, 
        bathroom, 
        car_park, 
        email,
        photo
    });
  } else{
    res.status(400);
    throw new Error('Invalid property data')
  }
});

const getProperty = asyncHandler(async(req, res) => {
    const property = await Property.findOne(req.params.name);

    if(property) {
        const {_id, name, location, price, rooms, description, bathroom, car_park, email, photo} = property;

    res.status(200).json({
        _id, name, 
        location, price, rooms, description, bathroom, car_park, email, photo
    });
    } else {
        res.status(404);
        throw new Error("Property not found");
    }
});


const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findOne(req.params.name);
  
    if (property) {
      const {name, location, price, rooms, description, bathroom, car_park , email, photo} = property;
  
      property.name = name;
      property.email = email;
      property.location = req.body.location || location;
      property.price = req.body.price || price;
      property.rooms = req.body.rooms || rooms;
      property.description = req.body.description || description;
      property.bathroom = req.body.bathroom || bathroom;
      property.car_park = req.body.car_park || car_park;
      property.photo = req.body.photo || photo;
      
  
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
      });
    } else {
      res.status(404);
      throw new Error("Property not found");
    }
  });
  
  // Delete User
  const deleteProperty = asyncHandler(async (req, res) => {
    const property = Property.findById(req.params.id);
  
    if (!property) {
      res.status(404);
      throw new Error("User not found");
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


module.exports = {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty,
    getProperties
}