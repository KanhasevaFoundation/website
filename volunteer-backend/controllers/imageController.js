const { fetchImagesFromFolder } = require('../utils/cloudinaryUtils'); // Import the function

/**
 * Controller to fetch images from a specific folder in Cloudinary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getImages = async (req, res) => {
  try {
    const folderName = 'Imagesgallery'; // Replace with your folder name
    const images = await fetchImagesFromFolder(folderName); // Fetch images from Cloudinary
    res.json(images); // Send the image URLs as a JSON response
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

module.exports = { getImages };