const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createProperty, updateProperty, getProperty, getProperties, deleteProperty, reUpdateProperty } = require("../controllers/propertyController");
const router = express.Router();

router.post('/create-property', createProperty);
router.patch('/update-property', protect, updateProperty);
router.put('/reset-isBooked/:propertyId', protect, reUpdateProperty);
router.get('/get-property-data', protect, getProperty);
router.get('/get-properties', getProperties);
router.delete('/:id', protect, deleteProperty)

module.exports = router