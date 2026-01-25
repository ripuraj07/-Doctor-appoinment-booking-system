const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Create appointment (authenticated user)
router.post('/', auth, async (req, res) => {
  try {
    const { doctor, date, notes, triage } = req.body;
    const userId = req.user && req.user._id ? req.user._id.toString() : 'UNKNOWN';
    
    console.log('\n=== APPOINTMENT CREATE ===');
    console.log('User ID:', userId);
    console.log('Doctor:', doctor);
    console.log('Date:', date, '(', new Date(date).toLocaleString(), ')');
    console.log('Notes:', notes || '(none)');
    console.log('Triage:', triage);
    
    // Validation
    if (!doctor || !date) {
      console.warn('❌ Validation failed: missing doctor or date');
      return res.status(400).json({ message: 'Doctor name and appointment date are required' });
    }
    
    // Create appointment
    const appt = new Appointment({ 
      patient: req.user._id, 
      doctor, 
      date, 
      notes: notes || '', 
      triage: triage || {} 
    });
    
    console.log('📝 Saving appointment to database...');
    await appt.save();
    
    console.log('✅ Appointment saved successfully');
    console.log('Appointment ID:', appt._id.toString());
    console.log('Status:', appt.status);
    console.log('======================\n');
    
    res.status(201).json(appt);
  } catch (err) {
    console.error('\n❌ ERROR CREATING APPOINTMENT');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('======================\n');
    res.status(500).json({ message: err.message });
  }
});

// Get current user's appointments
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user && req.user._id ? req.user._id.toString() : 'UNKNOWN';
    
    console.log('\n=== FETCH APPOINTMENTS ===');
    console.log('User ID:', userId);
    
    const list = await Appointment.find({ patient: req.user._id }).sort({ date: 1 });
    
    console.log('✅ Found', list.length, 'appointment(s)');
    list.forEach((appt, idx) => {
      console.log(`  [${idx + 1}] ${appt.doctor} on ${new Date(appt.date).toLocaleString()} (${appt.status})`);
    });
    console.log('======================\n');
    
    res.json(list);
  } catch (err) {
    console.error('\n❌ ERROR FETCHING APPOINTMENTS');
    console.error('Error:', err.message);
    console.error('======================\n');
    res.status(500).json({ message: err.message });
  }
});

// Get current user's appointment history (all appointments sorted by date, newest first)
router.get('/history', auth, async (req, res) => {
  try {
    const history = await Appointment.find({ patient: req.user._id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
