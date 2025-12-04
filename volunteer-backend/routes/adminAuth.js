const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');


// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isHashed = typeof admin.password === 'string' && admin.password.startsWith('$2');
    const ok = isHashed ? await bcrypt.compare(password, admin.password) : password === admin.password;
    if (!ok) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (admin.enabled === false) {
      return res.status(403).json({ message: 'Account disabled' });
    }

    // Authentication successful
    const safeUser = {
      id: admin._id,
      username: admin.username,
      enabled: admin.enabled !== false,
      role: admin.role || 'user',
      permissions: admin.permissions || {},
    };
    res.status(200).json({ message: 'Login successful', user: safeUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error);
  }
});



module.exports = router;
