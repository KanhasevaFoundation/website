const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  role: { type: String, enum: ['admin','user'], default: 'user' },
  permissions: {
    donors: { type: Boolean, default: false },
    volunteers: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    tasks: { type: Boolean, default: false },
    socialLinks: { type: Boolean, default: false },
    menuVisibility: { type: Boolean, default: false },
    adminUsers: { type: Boolean, default: false },
  },
});

adminSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Admin', adminSchema);
