const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');

router.get('/settings', async (req, res) => {
  try {
    const doc = await SiteSettings.findOne();
    res.json(doc || { menuVisibility: { home: true, gallery: true, volunteers: true, donate: true } });
  } catch (err) {
    res.status(500).json({ message: 'failed to load settings' });
  }
});

router.put('/admin/settings', async (req, res) => {
  try {
    const update = req.body || {};
    const doc = await SiteSettings.findOneAndUpdate({}, update, { new: true, upsert: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'failed to save settings' });
  }
});

module.exports = router;
