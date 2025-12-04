const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/users', async (req, res) => {
  try {
    const users = await Admin.find({}, { username: 1, role: 1, enabled: 1, permissions: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'failed to list admin users' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, password, enabled, permissions } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'username already exists' });
    const user = new Admin({ username, password, enabled: enabled ?? false, permissions: permissions || {}, role: 'admin' });
    await user.save();
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message || 'failed to create admin user' });
  }
});

// Delete admin user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    await Admin.deleteOne({ _id: id });
    res.json({ message: 'deleted', id });
  } catch (err) {
    res.status(500).json({ message: 'failed to delete admin user' });
  }
});

// Update admin user permissions/enabled
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled, permissions } = req.body;
    const user = await Admin.findByIdAndUpdate(
      id,
      { $set: { ...(enabled !== undefined ? { enabled } : {}), ...(permissions ? { permissions } : {}) } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.json({ id: user._id, username: user.username, enabled: user.enabled, permissions: user.permissions || {} });
  } catch (err) {
    res.status(500).json({ message: 'failed to update admin user' });
  }
});

module.exports = router;
