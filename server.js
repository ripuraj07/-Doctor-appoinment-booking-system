require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

console.log('[STARTUP] Starting server initialization...');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') return res.sendStatus(200);
	next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' });
});

// Pages
app.get('/user', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Catch-all
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital-appointment-system';

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log('[DB] MongoDB connected successfully');
	
	// Start server after DB is connected
	const PORT = process.env.PORT || 5000;
	const server = app.listen(PORT, () => {
		console.log(`[SERVER] ✓ Listening on http://localhost:${PORT}`);
		console.log(`[SERVER] ✓ Health check: http://localhost:${PORT}/api/health`);
		console.log(`[SERVER] ✓ User dashboard: http://localhost:${PORT}/user`);
	});
	
	server.on('error', (err) => {
		console.error('[SERVER_ERROR]', err);
	});
})
.catch(err => {
	console.error('[DB_ERROR] MongoDB connection failed:', err.message);
	process.exit(1);
});
