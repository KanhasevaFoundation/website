const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema({
  youtube: String,
  instagram: String,
  facebook: String,
  twitter: String,
  website: String,
  linkedin: String,
}, { timestamps: true });

module.exports = mongoose.model('SocialLinks', socialLinksSchema);
