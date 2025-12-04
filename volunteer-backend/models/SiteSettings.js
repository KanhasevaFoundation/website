const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  menuVisibility: {
    home: { type: Boolean, default: true },
    gallery: { type: Boolean, default: true },
    volunteers: { type: Boolean, default: true },
    donate: { type: Boolean, default: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
