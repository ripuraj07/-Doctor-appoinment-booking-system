const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const auth = require('../middleware/auth');

// ensure uploads dir exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadsDir); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'_')); }
});
const upload = multer({ storage });

const router = express.Router();

// Register
router.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already in use' });
    const avatarPath = req.file ? '/uploads/' + req.file.filename : undefined;
    user = new User({ name, email, password, role, ...(avatarPath ? { avatar: avatarPath } : {}) });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await user.comparePassword(password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update current user's profile (name and/or avatar)
router.put('/profile', auth, upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name } = req.body;
    if (name) user.name = name;
    if (req.file) {
      // remove old uploaded avatar if it was under uploads (not default)
      if (user.avatar && user.avatar.startsWith('/uploads/')){
        const old = path.join(__dirname, '..', 'public', user.avatar.replace(/^\//, ''));
        try{ if (fs.existsSync(old)) fs.unlinkSync(old); }catch(e){}
      }
      user.avatar = '/uploads/' + req.file.filename;
    }
    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
