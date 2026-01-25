const express = require('express');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

// Get all users
router.get('/users', auth, requireAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all appointments
router.get('/appointments', auth, requireAdmin, async (req, res) => {
  const appts = await Appointment.find().populate('patient', 'name email').sort({ date: 1 });
  res.json(appts);
});

// Update appointment status
router.put('/appointments/:id', auth, requireAdmin, async (req, res) => {
  const { status } = req.body;
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ message: 'Not found' });
  appt.status = status || appt.status;
  await appt.save();
  res.json(appt);
});

module.exports = router;
