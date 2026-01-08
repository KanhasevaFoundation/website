// server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Load environment variables from the server directory
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
// const path = require('path');
const contactRoutes = require("./routes/contactRoutes");
const volunteerRoutes = require('./routes/VolunteerRoutes');
const imageRoutes = require('./routes/imagesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.VITE_FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://kanhasevain.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, true); // allow for now to avoid local CORS issues
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(bodyParser.json());

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});

// Initialize Multer
const upload = multer({ storage: storage });

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI; // Use the environment variable

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', volunteerRoutes);

// Basic root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Volunteer API!');
});

app.use("/api", contactRoutes);

app.use('/api', imageRoutes);

// Example route to handle image upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, t: Date.now() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//ADmin 
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);

//Donation
const donationRoutes = require('./routes/DonateRoutes')
app.use('/api', donationRoutes);

//DonorShow
const donorRoutes = require('./routes/donorRoute')
app.use('/api/donors', donorRoutes);

// Analytics
const analyticsRoutes = require('./routes/analyticsRoutes');
app.use('/api/analytics', analyticsRoutes);
const socialLinksRoutes = require('./routes/socialLinksRoutes');
app.use('/api', socialLinksRoutes);
const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api', settingsRoutes);
const adminUsersRoutes = require('./routes/adminUsersRoutes');
app.use('/api/admin', adminUsersRoutes);
// Volunteer auth disabled per requirements

