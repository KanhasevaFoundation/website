const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/admin/tasks', async (req, res) => {
  try {
    const t = new Task(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: 'failed to create task' });
  }
});

router.get('/admin/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'failed to list tasks' });
  }
});

router.put('/admin/tasks/:id', async (req, res) => {
  try {
    const t = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ message: 'task not found' });
    res.json(t);
  } catch (err) {
    res.status(400).json({ message: 'failed to update task' });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const q = {};
    if (req.query.assignedToType) q.assignedToType = req.query.assignedToType;
    if (req.query.assignedToId) q.assignedToId = req.query.assignedToId;
    const tasks = await Task.find(q).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'failed to list tasks' });
  }
});

module.exports = router;
