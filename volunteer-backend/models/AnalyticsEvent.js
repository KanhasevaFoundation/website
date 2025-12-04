const mongoose = require('mongoose');

const AnalyticsEventSchema = new mongoose.Schema({
  type: { type: String, enum: ['page_view', 'click'], required: true },
  path: { type: String, required: true },
  element: { type: String },
  referrer: { type: String },
  userAgent: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
