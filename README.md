# 🏥 Hospital Appointment Booking System - MERN Stack

A **production-ready** Hospital Appointment Booking System built with **MERN Stack** (MongoDB, Express, React, Node.js) featuring JWT authentication, role-based access control, and comprehensive appointment management.

## ⭐ Key Features

### 👤 Patient Features
- ✅ User registration with hospital-specific fields
- ✅ Secure login with JWT authentication
- ✅ View and update profile information
- ✅ Book appointments with doctors
- ✅ Track appointment status (Pending, Approved, Completed, Rejected)
- ✅ Cancel appointments
- ✅ View appointment history

### 🔑 Admin Features
- ✅ One admin account (role-based)
- ✅ View all appointments with advanced filters
- ✅ Approve pending appointments
- ✅ Reject appointments with reasons
- ✅ Mark appointments as completed
- ✅ Add and manage doctors
- ✅ View dashboard statistics
- ✅ Track appointment metrics

### 🔐 Security Features
- ✅ JWT token-based authentication
- ✅ Bcryptjs password hashing
- ✅ Role-based authorization middleware
- ✅ Protected API endpoints
- ✅ Email validation
- ✅ Secure error handling
- ✅ Token expiration management

---

## 🏗️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling
- **ES6+** - Modern JavaScript

---

## 📂 Project Structure

```
hospital-appointment-system/
│
├── 📄 PROJECT_SUMMARY.md           ⭐ Start here - Project overview
├── 📄 COMPLETE_SETUP_GUIDE.md      - Detailed setup & deployment
├── 📄 API_DOCUMENTATION.md         - Complete API reference
├── 📄 FILE_INDEX.md                - File structure guide
├── 🎬 QUICK_START.bat              - Windows setup script
├── 🎬 QUICK_START.sh               - Linux/Mac setup script
│
├── 🔧 Backend
│   ├── config/
│   │   └── database.js             - MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       - Auth logic (Register, Login, Profile)
│   │   ├── appointmentController.js - Appointment management
│   │   └── adminController.js      - Admin operations
│   ├── middleware/
│   │   ├── auth.js                 - JWT verification
│   │   └── authorize.js            - Role-based access control
│   ├── models/
│   │   ├── User.js                 - Patient & Admin schema
│   │   ├── Doctor.js               - Doctor schema
│   │   └── Appointment.js          - Appointment schema
│   ├── routes/
│   │   ├── auth.js                 - Auth routes (5 endpoints)
│   │   ├── appointments.js         - Appointment routes (5 endpoints)
│   │   └── admin.js                - Admin routes (8 endpoints)
│   ├── server.js                   - Express server setup
│   ├── package.json                - Dependencies
│   ├── .env.example                - Environment template
│   └── .gitignore
│
└── 💻 Frontend
    └── src/
        ├── services/
        │   ├── api.js              - Axios instance
        │   ├── authService.js      - Auth API calls
        │   ├── appointmentService.js - Appointment API calls
        │   └── adminService.js     - Admin API calls
        ├── pages/
        │   ├── Login.js            - Login component
        │   ├── Signup.js           - Registration component
        │   ├── PatientDashboard.js - Patient main page
        │   ├── AdminDashboard.js   - Admin main page
        │   ├── Auth.css            - Auth styles
        │   ├── PatientDashboard.css
        │   └── AdminDashboard.css
        ├── App.js                  - Main app component
        └── index.js                - React entry point
    └── package.json                - Dependencies

```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation (Automatic)

#### Windows:
```bash
QUICK_START.bat
```

#### Linux/Mac:
```bash
bash QUICK_START.sh
```

### Manual Installation

#### 1. Backend Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your values
# MONGODB_URI=mongodb://localhost:27017/hospital-appointment-system
# JWT_SECRET=your_secret_key

# Start MongoDB
mongod

# Start backend (another terminal)
npm run dev          # Development
npm start            # Production
```

#### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start

# Build for production
npm build
```

**Backend runs on:** `http://localhost:5000`  
**Frontend runs on:** `http://localhost:3000`

---

## 🔑 Authentication Flow

### 1. Setup Admin (First Time)
```bash
POST /api/auth/setup-admin
Body: {
  "firstName": "John",
  "lastName": "Admin",
  "email": "admin@hospital.com",
  "password": "AdminPass123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "Admin account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Admin",
    "email": "admin@hospital.com",
    "role": "admin"
  }
}
```

### 2. Patient Registration
```bash
POST /api/auth/register
Body: {
  "firstName": "Jane",
  "lastName": "Patient",
  "email": "patient@example.com",
  "password": "PatientPass123",
  "phone": "+9876543210",
  "dateOfBirth": "1990-01-01",
  "gender": "female",
  "address": "123 Main St"
}
```

### 3. Login
```bash
POST /api/auth/login
Body: {
  "email": "patient@example.com",
  "password": "PatientPass123"
}
```

Token is automatically stored in localStorage and sent with all requests.

---

## 📱 API Endpoints

### Authentication (5 endpoints)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/setup-admin` | Create admin | Public |
| POST | `/api/auth/register` | Register patient | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get profile | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Appointments (5 endpoints)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/appointments/book` | Book appointment | Private |
| GET | `/api/appointments/my-appointments` | Get patient's appointments | Private |
| GET | `/api/appointments/:id` | Get appointment details | Private |
| PUT | `/api/appointments/:id/cancel` | Cancel appointment | Private |
| GET | `/api/appointments/doctor/:doctorId` | Get doctor's appointments | Private |

### Admin (8 endpoints)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/appointments/pending` | Get pending appointments | Admin |
| GET | `/api/admin/appointments/all` | Get all appointments | Admin |
| PUT | `/api/admin/appointments/:id/approve` | Approve appointment | Admin |
| PUT | `/api/admin/appointments/:id/reject` | Reject appointment | Admin |
| PUT | `/api/admin/appointments/:id/complete` | Complete appointment | Admin |
| GET | `/api/admin/doctors` | Get all doctors | Admin |
| POST | `/api/admin/doctors` | Add new doctor | Admin |
| GET | `/api/admin/dashboard-stats` | Get statistics | Admin |

**Total: 18 API Endpoints**

---

## 🔄 Appointment Status Flow

```
┌─────────┐
│ PENDING │  ← New appointment booked
└────┬────┘
     │
     ├──→ APPROVED  ← Admin approves
     │        │
     │        └──→ COMPLETED  ← Appointment held
     │
     └──→ REJECTED  ← Admin rejects with reason
     
CANCELLED ← Patient cancels pending/approved
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String,              // 'patient' or 'admin'
  dateOfBirth: Date,
  gender: String,
  address: String,
  bloodType: String,
  medicalHistory: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Collection
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  specialization: String,    // Cardiology, Pediatrics, etc.
  qualifications: [String],
  yearsOfExperience: Number,
  licenseNumber: String (unique),
  hospitalDepartment: String,
  consultationFee: Number,
  availableDays: [String],
  availableTimeSlots: [{startTime, endTime}],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Collection
```javascript
{
  patientId: ObjectId,
  doctorId: ObjectId,
  appointmentDate: Date,
  timeSlot: String,
  reason: String,
  symptoms: String,
  status: String,            // pending, approved, rejected, completed
  approvedBy: ObjectId,
  approvedAt: Date,
  rejectedReason: String,
  rejectedBy: ObjectId,
  rejectedAt: Date,
  completedAt: Date,
  adminNotes: String,
  prescriptionNotes: String,
  consultationFee: Number,
  paymentStatus: String,     // pending, paid, refunded
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing the Application

### 1. Setup Admin
```bash
# Use Postman or curl
POST http://localhost:5000/api/auth/setup-admin
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@hospital.com",
  "password": "Admin@123",
  "phone": "+1234567890"
}
```

### 2. Register Patient
Use the signup form at `http://localhost:3000/register`

### 3. Add Doctor (Admin)
```bash
POST http://localhost:5000/api/admin/doctors
Headers: Authorization: Bearer {admin_token}
{
  "firstName": "Dr.",
  "lastName": "Smith",
  "email": "doctor@hospital.com",
  "phone": "+1111111111",
  "specialization": "Cardiology",
  "yearsOfExperience": 10,
  "licenseNumber": "LIC12345",
  "hospitalDepartment": "Cardiology",
  "consultationFee": 500
}
```

### 4. Book Appointment (Patient)
```bash
POST http://localhost:5000/api/appointments/book
Headers: Authorization: Bearer {patient_token}
{
  "doctorId": "doctor_id",
  "appointmentDate": "2024-02-15",
  "timeSlot": "10:00 - 11:00",
  "reason": "Regular checkup",
  "symptoms": "Mild headache"
}
```

### 5. Approve Appointment (Admin)
```bash
PUT http://localhost:5000/api/admin/appointments/{id}/approve
Headers: Authorization: Bearer {admin_token}
{
  "adminNotes": "Approved"
}
```

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| Total Files | 30+ |
| Lines of Code | 3000+ |
| Controllers | 3 |
| Models | 3 |
| Routes | 3 |
| API Endpoints | 18 |
| React Components | 4+ |
| CSS Files | 5 |
| Database Collections | 3 |

---

## 🔒 Security Best Practices

✅ **Password Security**: Bcryptjs hashing with 10 salt rounds
✅ **JWT Tokens**: 30-day expiration
✅ **Input Validation**: All fields validated
✅ **Error Handling**: Secure messages
✅ **CORS**: Configured for frontend domain
✅ **Environment Variables**: Sensitive data in .env
✅ **Role-Based Access**: Protected routes
✅ **Token Refresh**: Automatic on request

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or update connection string in .env

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process on port 5000 or change PORT in .env

### Token Not Found
**Solution**: Login again. Token might be expired or corrupted.

### CORS Error
**Solution**: Check CORS configuration in server.js matches frontend URL

---

## 📚 Documentation

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Comprehensive project overview
- **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** - Detailed setup instructions
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[FILE_INDEX.md](FILE_INDEX.md)** - File structure explanation

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.2",
  "dotenv": "^16.3.1"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "axios": "^1.6.2",
  "date-fns": "^2.30.0",
  "react-icons": "^4.12.0"
}
```

---

## 🚢 Deployment Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Configure MongoDB backups
- [ ] Setup error logging
- [ ] Configure CORS for production domain
- [ ] Test all API endpoints
- [ ] Load test the application
- [ ] Setup CI/CD pipeline
- [ ] Monitor performance

---

## 🔮 Future Enhancements

- Email notifications for appointments
- SMS reminders
- Payment gateway integration
- Video consultation support
- Prescription management
- Medical records storage
- Doctor availability calendar
- Appointment rescheduling
- Patient feedback system
- Real-time notifications

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author Notes

This is a **production-ready** Hospital Appointment Booking System with:
- Clean, maintainable code
- Comprehensive error handling
- Security best practices
- Complete API documentation
- Responsive UI design
- Easy to extend and customize

**Ready to deploy!** 🚀

---

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements.

---

## 📞 Support

For issues or questions, refer to the documentation files:
- COMPLETE_SETUP_GUIDE.md
- API_DOCUMENTATION.md
- FILE_INDEX.md

---

**Version**: 1.0.0  
**Last Updated**: December 29, 2025  
**Status**: ✅ Production Ready

Happy Coding! 🎉

