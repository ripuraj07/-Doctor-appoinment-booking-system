# 🚀 Quick Start Guide - Appointment Booking System

## ✅ System Status: FULLY OPERATIONAL

---

## 📝 How to Use

### 1. **Register/Login**
- Visit: http://localhost:5000
- Create new account with email and password
- You'll receive a JWT token (stored in localStorage)

### 2. **Book an Appointment**
- Fill in the "Book New Appointment" form:
  - **Doctor Name** (required): Enter any doctor name
  - **Date/Time** (required): Click calendar, select future date
  - **Notes** (optional): Write any notes
  - **Symptoms** (optional): Comma-separated list
  - **Severity** (optional): Select mild/moderate/severe
  - **Phone** (optional): Contact number

- Click **"Book Appointment"** button

### 3. **See Your Appointments**
- **Upcoming Appointments**: Shows appointments with future dates
- **Appointment History**: Shows all booked appointments (newest first)

### 4. **View Appointment Details**
- Doctor name
- Date and time
- Status badge (with color coding)
- Any notes you added

---

## 🎨 Visual Guide

### Color-Coded Status Badges
- 🟠 **Pending** (orange) - Just booked, waiting for confirmation
- 🔵 **Confirmed** (blue) - Confirmed by doctor
- 🟢 **Completed** (green) - Appointment already happened
- 🔴 **Cancelled** (red) - Appointment was cancelled

---

## 🔧 Server Management

### Start Server
```bash
cd c:\Users\hp\OneDrive\Desktop\appoinment
node server.js
```

**Expected output:**
```
Server running: http://localhost:5000
MongoDB connected
```

### Stop Server
Press `Ctrl+C` in the terminal

### Restart Server
```bash
Stop-Process -Name node -Force
Start-Sleep 2
node server.js
```

---

## 🧪 Test the System

### Manual Test
1. Open http://localhost:5000
2. Register: `john@test.com` / `password123`
3. Book: `Dr. Smith` for tomorrow 10:00 AM
4. ✅ Should appear in "Upcoming Appointments"

### Check Browser Console (F12 → Console)
```javascript
[Init] Page loaded
[Load] Received 1 appointments
[Booking] Submitting appointment
[Booking] Success! Appointment ID: 60b3f4...
```

### Check Server Logs
```
=== APPOINTMENT CREATE ===
User ID: 60b3d1...
Doctor: Dr. Smith
✅ Appointment saved successfully
```

---

## 📊 Database

### MongoDB Collections
- **users**: Stores user accounts, emails, passwords
- **appointments**: Stores all booked appointments

### Sample Appointment Record
```json
{
  "_id": "60b3f4a1d9c2b12345",
  "patient": "60b3d1a1d9c2b12344",
  "doctor": "Dr. Smith",
  "date": "2026-02-15T10:00:00.000Z",
  "status": "pending",
  "notes": "Regular checkup",
  "triage": {
    "symptoms": ["fever", "cough"],
    "severity": "moderate",
    "phone": "555-1234"
  },
  "createdAt": "2026-01-25T15:30:00.000Z",
  "updatedAt": "2026-01-25T15:30:00.000Z"
}
```

---

## 🔐 Security Features

✅ **Authentication**: JWT tokens for user sessions  
✅ **Authorization**: Users can only see their own appointments  
✅ **Password**: Hashed in database (bcrypt)  
✅ **CORS**: Enabled for frontend communication  
✅ **Validation**: Input validation on both frontend and backend  

---

## 🐛 Troubleshooting

### Issue: "Loading..." forever
- **Check**: Is server running?
- **Solution**: Start server with `node server.js`

### Issue: Appointment not saving
- **Check**: Look at server console for error messages
- **Solution**: Verify all required fields are filled
- **Debug**: Open DevTools (F12) and check Network tab

### Issue: Can't login
- **Check**: Did you register first?
- **Solution**: Go to /register.html or /login.html
- **Reset**: Clear localStorage: `localStorage.clear()`

### Issue: "Token invalid"
- **Cause**: Session expired or token corrupted
- **Solution**: Log out and log back in

### Issue: Server won't start
- **Check**: Is port 5000 already in use?
- **Solution**: `Stop-Process -Name node -Force` then restart
- **Alternative**: Change PORT in `.env` file

---

## 📋 API Endpoints (For Reference)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update profile

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get user's appointments

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/appointments` - Get all appointments

---

## 📁 Project Structure

```
appoinment/
├── server.js              # Main Express server
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   ├── User.js           # User schema
│   └── Appointment.js    # Appointment schema
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── appointments.js   # Appointment routes
│   └── admin.js          # Admin routes
├── middleware/
│   └── auth.js           # JWT verification
├── public/
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── user.html         # User dashboard (MAIN)
│   ├── admin.html        # Admin dashboard
│   └── styles.css        # CSS styles
└── scripts/
    └── test-appointment-flow.js
```

---

## 🎯 Next Steps

### To Add More Features:
1. **Edit appointment status** (pending → confirmed → completed)
2. **Cancel appointment** functionality
3. **Reschedule appointment** feature
4. **Email notifications** when appointment confirmed
5. **Doctor availability** management
6. **Multiple doctors** support
7. **Time slot management** system
8. **Patient records** integration

---

## 📞 Support

For issues or questions:
1. Check server console logs
2. Check browser console (F12)
3. Check MongoDB connection
4. Verify port 5000 is available
5. Ensure all dependencies installed (`npm install`)

---

## ✨ Features Overview

| Feature | Status |
|---------|--------|
| User Registration | ✅ Working |
| User Login | ✅ Working |
| Book Appointment | ✅ Working |
| View Upcoming Appointments | ✅ Working |
| View Appointment History | ✅ Working |
| Status Tracking | ✅ Working |
| Error Handling | ✅ Comprehensive |
| Data Persistence | ✅ MongoDB |
| Security | ✅ JWT + Validation |
| Logging | ✅ Detailed |

---

**Version:** 1.0.0  
**Last Updated:** January 25, 2026  
**Status:** ✅ Production Ready
