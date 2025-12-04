// routes/volunteerRoutes.js
const express = require('express');
const Volunteer = require('../models/Volunteer');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig'); // Import Cloudinary configuration

// Set up Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder in your Cloudinary account where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

// Create a new volunteer route with file upload
router.post('/volunteers', upload.single('image'), async (req, res) => {
  const { name, age, dob, gender, phone, whatsapp, email, designation, address, state, termsAccepted } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const requiredStrings = [name, gender, phone, email, designation, address, state];
    const validPhone = typeof phone === 'string' && /^[0-9]{10}$/.test(phone);
    const validEmail = typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
    const validAge = !isNaN(Number(age)) && Number(age) > 0 && Number(age) <= 100;
    if (requiredStrings.some(v => !v) || !validPhone || !validEmail || !validAge || !dob || termsAccepted !== 'true' && termsAccepted !== true) {
      return res.status(400).json({ message: 'Invalid volunteer data' });
    }

    const newVolunteer = new Volunteer({
      name,
      age,
      dob,
      gender,
      phone,
      whatsapp,
      email,
      designation,
      address,
      state,
      termsAccepted,
      image,
    });

    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating volunteer' });
  }
});

router.put('/admin/volunteers/:id/status', async (req, res) => {
  try {
    const v = await Volunteer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!v) return res.status(404).json({ message: 'Volunteer not found' });
    res.json({ id: v._id, status: v.status });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// GET route to fetch all volunteers
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

module.exports = router;
