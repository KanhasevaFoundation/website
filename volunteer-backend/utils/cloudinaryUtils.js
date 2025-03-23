const cloudinary = require('../cloudinaryConfig'); // Import your Cloudinary config

/**
 * Fetches images from a specific folder in Cloudinary.
 * @param {string} folderName - The name of the folder in Cloudinary.
 * @returns {Promise<Array>} - Array of image URLs.
 */
const fetchImagesFromFolder = async (folderName) => {
  try {
    // Use Cloudinary's search API to fetch images from the folder
    const result = await cloudinary.search
      .expression(`folder:${folderName}`) // Fetch images from the specified folder
      .sort_by('public_id', 'desc') // Sort by public_id (optional)
      .max_results(50) // Limit the number of results (optional)
      .execute();

    // Extract the secure URLs of the images
    const imageUrls = result.resources.map((resource) => resource.secure_url);
    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw error;
  }
};

module.exports = { fetchImagesFromFolder };