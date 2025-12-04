const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedToType: { type: String, enum: ['admin','volunteer'], required: true },
  assignedToId: { type: mongoose.Schema.Types.ObjectId, required: true },
  dueDate: Date,
  status: { type: String, enum: ['pending','done'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
