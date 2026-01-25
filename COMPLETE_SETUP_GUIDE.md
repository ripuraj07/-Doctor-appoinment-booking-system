# Hospital Appointment Booking System - MERN Stack

A complete Hospital Appointment Booking System built with MERN (MongoDB, Express, React, Node.js) stack featuring role-based access control, appointment management, and admin dashboard.

## 📋 Features

### Patient Features
- ✅ User registration and login with JWT authentication
- ✅ View profile and update personal information
- ✅ Book appointments with doctors
- ✅ View appointment status (Pending, Approved, Completed, Rejected)
- ✅ Cancel appointments
- ✅ Track consultation fees and payment status

### Admin Features
- ✅ One admin account (role-based access)
- ✅ View all appointments with filters
- ✅ Approve or reject pending appointments
- ✅ Mark appointments as completed
- ✅ Add and manage doctors
- ✅ View dashboard statistics
- ✅ Track appointment metrics

### Security Features
- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based authorization middleware
- ✅ Protected API endpoints
- ✅ Email validation
- ✅ Token expiration handling

## 🏗️ Project Structure

```
hospital-appointment-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── authorize.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   └── admin.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── appointmentService.js
    │   │   └── adminService.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── PatientDashboard.js
    │   │   ├── AdminDashboard.js
    │   │   └── *.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/hospital-appointment-system
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB:**
   ```bash
   # Using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

6. **Start Backend Server:**
   ```bash
   # Development (with nodemon)
   npm run dev
   
   # Production
   npm start
   ```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start React Development Server:**
   ```bash
   npm start
   ```

Frontend will run on `http://localhost:3000`

---

## 🔑 Authentication Flow

### 1. Setup Admin Account (First Time)

Make a POST request to setup admin:

```bash
curl -X POST http://localhost:5000/api/auth/setup-admin \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Admin",
    "email": "admin@hospital.com",
    "password": "AdminPass123",
    "phone": "+1234567890"
  }'
```

Response:
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

Patients can register using the signup form at `/register`

### 3. Login

Both patients and admins login with email and password at `/login`

### 4. Token Management

- Token is stored in `localStorage` as `token`
- Token is automatically added to all API requests
- Token expires after 30 days
- Expired token will redirect to login page

---

## 📱 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/setup-admin` | Create admin account |
| POST | `/api/auth/register` | Register patient |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (Protected) |
| PUT | `/api/auth/profile` | Update profile (Protected) |

### Appointment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments/book` | Book appointment (Protected) |
| GET | `/api/appointments/my-appointments` | Get patient's appointments (Protected) |
| GET | `/api/appointments/:id` | Get appointment details (Protected) |
| PUT | `/api/appointments/:id/cancel` | Cancel appointment (Protected) |
| GET | `/api/appointments/doctor/:doctorId` | Get doctor's appointments (Protected) |

### Admin Endpoints

All admin endpoints require admin authentication and authorization.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/appointments/pending` | Get pending appointments |
| GET | `/api/admin/appointments/all` | Get all appointments (with filters) |
| PUT | `/api/admin/appointments/:id/approve` | Approve appointment |
| PUT | `/api/admin/appointments/:id/reject` | Reject appointment |
| PUT | `/api/admin/appointments/:id/complete` | Complete appointment |
| GET | `/api/admin/doctors` | Get all doctors |
| POST | `/api/admin/doctors` | Add new doctor |
| GET | `/api/admin/dashboard-stats` | Get dashboard statistics |

---

## 🔄 Appointment Status Workflow

```
pending → approved → completed
       ↘ rejected
       ↘ cancelled
```

- **pending**: Appointment just booked, awaiting admin approval
- **approved**: Admin has approved the appointment
- **completed**: Appointment has been completed by doctor
- **rejected**: Admin has rejected with reason
- **cancelled**: Patient cancelled the appointment

---

## 📊 Database Schemas

### User Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (patient/admin),
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

### Doctor Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  specialization: String,
  qualifications: [String],
  yearsOfExperience: Number,
  licenseNumber: String (unique),
  hospitalDepartment: String,
  consultationFee: Number,
  availableDays: [String],
  availableTimeSlots: [{startTime, endTime}],
  bio: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Schema
```javascript
{
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  appointmentDate: Date,
  timeSlot: String,
  reason: String,
  symptoms: String,
  status: String (pending/approved/rejected/completed/cancelled),
  approvedBy: ObjectId (ref: User),
  approvedAt: Date,
  rejectedReason: String,
  rejectedBy: ObjectId (ref: User),
  rejectedAt: Date,
  completedAt: Date,
  adminNotes: String,
  prescriptionNotes: String,
  consultationFee: Number,
  paymentStatus: String (pending/paid/refunded),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛡️ Security Best Practices

1. **Password Security**: All passwords are hashed using bcryptjs with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication with 30-day expiration
3. **Role-Based Access**: Admin-only routes protected with authorization middleware
4. **Input Validation**: All inputs validated before processing
5. **Error Handling**: Secure error messages without exposing sensitive details
6. **HTTPS**: Recommended for production deployment

### Environment Variables

Never commit `.env` file. Use `.env.example` as template.

**Production Security**:
- Use strong `JWT_SECRET`
- Use HTTPS
- Enable CORS properly
- Set `NODE_ENV=production`
- Use environment-specific database

---

## 📝 Testing the System

### 1. Setup Admin
```bash
POST /api/auth/setup-admin
Body: {
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@hospital.com",
  "password": "Admin@123",
  "phone": "+1234567890"
}
```

### 2. Patient Registration
Use frontend signup form or:
```bash
POST /api/auth/register
Body: {
  "firstName": "Patient",
  "lastName": "User",
  "email": "patient@example.com",
  "password": "Patient@123",
  "phone": "+9876543210",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Main St"
}
```

### 3. Login
```bash
POST /api/auth/login
Body: {
  "email": "patient@example.com",
  "password": "Patient@123"
}
```

### 4. Add Doctor (Admin Only)
```bash
POST /api/admin/doctors
Headers: Authorization: Bearer {token}
Body: {
  "firstName": "Dr.",
  "lastName": "Smith",
  "email": "doctor@hospital.com",
  "phone": "+1111111111",
  "specialization": "Cardiology",
  "yearsOfExperience": 10,
  "licenseNumber": "LIC12345",
  "hospitalDepartment": "Cardiology",
  "consultationFee": 500,
  "availableDays": ["Monday", "Wednesday", "Friday"],
  "availableTimeSlots": [
    {"startTime": "10:00", "endTime": "11:00"},
    {"startTime": "14:00", "endTime": "15:00"}
  ]
}
```

### 5. Book Appointment (Patient)
```bash
POST /api/appointments/book
Headers: Authorization: Bearer {token}
Body: {
  "doctorId": "doctor_id",
  "appointmentDate": "2024-02-15",
  "timeSlot": "10:00 - 11:00",
  "reason": "Regular checkup",
  "symptoms": "Mild headache"
}
```

### 6. Approve Appointment (Admin)
```bash
PUT /api/admin/appointments/{appointmentId}/approve
Headers: Authorization: Bearer {admin_token}
Body: {
  "adminNotes": "Approved"
}
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running or check MongoDB Atlas connection string

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Change PORT in .env or kill process on port 5000

**JWT Secret Missing**
```
Error: JWT secret is not defined
```
Solution: Add `JWT_SECRET` to .env file

### Frontend Issues

**API Connection Error**
```
Error: connect ECONNREFUSED
```
Solution: Make sure backend server is running and REACT_APP_API_URL is correct

**Token Not Found**
```
Redux/Auth Error
```
Solution: Login again, token might be expired

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Mongoose ODM](https://mongoosejs.com/)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Hospital Appointment Booking System - MERN Stack

---

## 🎯 Future Enhancements

- Email notifications for appointment confirmations
- SMS reminders before appointments
- Payment gateway integration
- Prescription management system
- Medical records storage
- Doctor availability calendar
- Patient feedback and ratings
- Appointment rescheduling
- Video consultation support
- Real-time notifications using Socket.io

---

## ✅ Checklist Before Production Deployment

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up MongoDB backups
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for all sensitive data
- [ ] Setup error logging and monitoring
- [ ] Test all API endpoints
- [ ] Setup CI/CD pipeline
- [ ] Configure domain and SSL certificate
- [ ] Setup database indexing
- [ ] Review security headers
- [ ] Load test the application

---

Happy Coding! 🚀
