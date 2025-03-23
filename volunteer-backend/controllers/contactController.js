const Contact = require("../models/Contact");

// Handle form submission
exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save contact details to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send success response
    res.status(201).json({ message: "Thank you for contacting us! We will get back to you soon." });
  } catch (error) {
    console.error("Error saving contact details:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};