const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' },
  notes: { type: String },
  triage: {
    symptoms: { type: [String], default: [] },
    severity: { type: String, enum: ['mild','moderate','severe'], default: 'mild' },
    phone: { type: String },
    additional: { type: String }
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
