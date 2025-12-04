// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  termsAccepted: Boolean,
  image: String,
  password: { type: String },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  permissions: {
    donors: { type: Boolean, default: false },
    volunteers: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    tasks: { type: Boolean, default: true },
    socialLinks: { type: Boolean, default: false },
    menuVisibility: { type: Boolean, default: false },
    adminUsers: { type: Boolean, default: false },
  },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
