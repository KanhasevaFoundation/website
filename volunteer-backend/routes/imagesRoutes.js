const express = require('express');
const { getImages } = require('../controllers/imageController'); // Import the controller
const router = express.Router();

// Define the route
router.get('/images', getImages); // GET /api/images

module.exports = router;