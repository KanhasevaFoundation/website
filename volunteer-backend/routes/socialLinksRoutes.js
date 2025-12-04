const express = require('express');
const router = express.Router();
const SocialLinks = require('../models/SocialLinks');

router.get('/social-links', async (req, res) => {
  try {
    const doc = await SocialLinks.findOne();
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ message: 'failed to load social links' });
  }
});

router.put('/admin/social-links', async (req, res) => {
  try {
    const update = req.body || {};
    const doc = await SocialLinks.findOneAndUpdate({}, update, { new: true, upsert: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'failed to save social links' });
  }
});

module.exports = router;
