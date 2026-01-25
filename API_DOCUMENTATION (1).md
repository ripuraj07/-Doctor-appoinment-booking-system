# Hospital Appointment Booking System - Backend API Documentation

## Overview
Complete Express.js backend for a Hospital Appointment Booking System with JWT authentication, role-based access control, and appointment management.

## Technologies Used
- **Node.js & Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment configuration

## Project Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── appointmentController.js # Appointment management
│   └── adminController.js       # Admin operations
├── middleware/
│   ├── auth.js                  # JWT verification
│   └── authorize.js             # Role-based authorization
├── models/
│   ├── User.js                  # User/Patient schema
│   ├── Doctor.js                # Doctor schema
│   └── Appointment.js           # Appointment schema
├── routes/
│   ├── auth.js                  # Auth endpoints
│   ├── appointments.js          # Appointment endpoints
│   └── admin.js                 # Admin endpoints
├── server.js                    # Main server file
├── .env.example                 # Environment variables template
└── package.json                 # Dependencies
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/hospital-appointment-system
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your machine or cloud instance.

### 4. Run Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:5000`

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Setup Admin
**POST** `/api/auth/setup-admin`
- Creates the first admin user (only works if no admin exists)
- **Access**: Public
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "admin@hospital.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```
- **Response**:
```json
{
  "message": "Admin account created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@hospital.com",
    "role": "admin"
  }
}
```

#### 2. Register Patient
**POST** `/api/auth/register`
- Register a new patient account
- **Access**: Public
- **Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "patient@example.com",
  "password": "patientPassword123",
  "phone": "+9876543210",
  "dateOfBirth": "1990-05-15",
  "gender": "female",
  "address": "123 Main St, City"
}
```
- **Response**: (Same structure as setup-admin, but with role: "patient")

#### 3. Login
**POST** `/api/auth/login`
- Login for both patients and admin
- **Access**: Public
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**: Returns token and user details

#### 4. Get Profile
**GET** `/api/auth/profile`
- Fetch current logged-in user's profile
- **Access**: Private (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "user": {
    "id": "user_id",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "patient@example.com",
    "phone": "+9876543210",
    "role": "patient",
    "dateOfBirth": "1990-05-15",
    "gender": "female",
    "address": "123 Main St, City",
    "bloodType": "O+",
    "emergencyContact": {...},
    "isActive": true,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

#### 5. Update Profile
**PUT** `/api/auth/profile`
- Update current user's profile information
- **Access**: Private (requires JWT token)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: (Any of these fields)
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+9876543210",
  "dateOfBirth": "1990-05-15",
  "gender": "female",
  "address": "123 Main St, City",
  "bloodType": "O+",
  "emergencyContact": {
    "name": "John Smith",
    "phone": "+1111111111",
    "relationship": "Spouse"
  }
}
```

---

### Appointment Routes (`/api/appointments`)

#### 1. Book Appointment
**POST** `/api/appointments/book`
- Create a new appointment
- **Access**: Private (Patients only)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "doctorId": "doctor_id",
  "appointmentDate": "2024-01-15",
  "timeSlot": "10:00 - 11:00",
  "reason": "Regular checkup",
  "symptoms": "Mild headache"
}
```
- **Response**:
```json
{
  "message": "Appointment booked successfully. Pending admin approval.",
  "appointment": {
    "id": "appointment_id",
    "patientId": "patient_id",
    "doctorId": {...doctor_details...},
    "appointmentDate": "2024-01-15",
    "timeSlot": "10:00 - 11:00",
    "reason": "Regular checkup",
    "symptoms": "Mild headache",
    "status": "pending",
    "consultationFee": 500,
    "paymentStatus": "pending",
    "createdAt": "timestamp"
  }
}
```

#### 2. Get My Appointments
**GET** `/api/appointments/my-appointments`
- Fetch all appointments of logged-in patient
- **Access**: Private (Patients)
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "count": 3,
  "appointments": [
    {
      "id": "appointment_id",
      "status": "approved",
      "appointmentDate": "2024-01-15",
      "timeSlot": "10:00 - 11:00",
      "doctorId": {...},
      ...
    }
  ]
}
```

#### 3. Get Appointment Details
**GET** `/api/appointments/:id`
- Fetch specific appointment details
- **Access**: Private (Authorized users only)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Single appointment object

#### 4. Cancel Appointment
**PUT** `/api/appointments/:id/cancel`
- Cancel pending or approved appointment
- **Access**: Private (Patient who booked it)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Updated appointment with status "cancelled"

#### 5. Get Doctor Appointments
**GET** `/api/appointments/doctor/:doctorId`
- Fetch all appointments for a specific doctor
- **Access**: Private (Admin/Doctor)
- **Headers**: `Authorization: Bearer <token>`

---

### Admin Routes (`/api/admin`)

**All admin routes require**:
- Private access (requires JWT token)
- Admin role authorization
- **Headers**: `Authorization: Bearer <token>`

#### 1. Get Pending Appointments
**GET** `/api/admin/appointments/pending`
- Fetch all pending appointments requiring approval
- **Response**: Array of pending appointments

#### 2. Get All Appointments
**GET** `/api/admin/appointments/all`
- Fetch all appointments with optional filters
- **Query Parameters**:
  - `status`: pending, approved, rejected, completed, cancelled
  - `doctorId`: Filter by doctor
  - `fromDate`: Start date (YYYY-MM-DD)
  - `toDate`: End date (YYYY-MM-DD)
- **Example**: `/api/admin/appointments/all?status=pending&fromDate=2024-01-01&toDate=2024-01-31`

#### 3. Approve Appointment
**PUT** `/api/admin/appointments/:id/approve`
- Approve a pending appointment
- **Request Body**:
```json
{
  "adminNotes": "Approved by Dr. Johnson"
}
```
- **Response**: Updated appointment with status "approved"

#### 4. Reject Appointment
**PUT** `/api/admin/appointments/:id/reject`
- Reject a pending appointment
- **Request Body**:
```json
{
  "rejectionReason": "Doctor unavailable on this date"
}
```
- **Response**: Updated appointment with status "rejected"

#### 5. Complete Appointment
**PUT** `/api/admin/appointments/:id/complete`
- Mark appointment as completed
- **Request Body**:
```json
{
  "prescriptionNotes": "Take medication twice daily"
}
```
- **Response**: Updated appointment with status "completed"

#### 6. Get All Doctors
**GET** `/api/admin/doctors`
- Fetch all active doctors in the system
- **Response**:
```json
{
  "count": 5,
  "doctors": [
    {
      "id": "doctor_id",
      "firstName": "Dr. Smith",
      "lastName": "Johnson",
      "specialization": "Cardiology",
      "email": "doctor@hospital.com",
      "phone": "+1234567890",
      "yearsOfExperience": 10,
      "consultationFee": 500,
      "availableDays": ["Monday", "Wednesday", "Friday"],
      "availableTimeSlots": [...],
      "isActive": true
    }
  ]
}
```

#### 7. Add New Doctor
**POST** `/api/admin/doctors`
- Add a new doctor to the system
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "doctor@hospital.com",
  "phone": "+1234567890",
  "specialization": "Cardiology",
  "qualifications": ["MBBS", "MD(Cardiology)"],
  "yearsOfExperience": 10,
  "licenseNumber": "LIC123456",
  "hospitalDepartment": "Cardiology Department",
  "consultationFee": 500,
  "availableDays": ["Monday", "Tuesday", "Wednesday", "Friday"],
  "availableTimeSlots": [
    {"startTime": "10:00", "endTime": "11:00"},
    {"startTime": "14:00", "endTime": "15:00"}
  ]
}
```

#### 8. Get Dashboard Statistics
**GET** `/api/admin/dashboard-stats`
- Fetch dashboard statistics and recent appointments
- **Response**:
```json
{
  "stats": {
    "appointments": {
      "total": 100,
      "pending": 15,
      "approved": 40,
      "completed": 40,
      "rejected": 5
    },
    "users": {
      "totalPatients": 150,
      "totalDoctors": 8
    }
  },
  "recentAppointments": [...]
}
```

---

## User Roles & Permissions

### Patient (Role: "patient")
- Can register and login
- Can view their profile
- Can update their profile
- Can book appointments
- Can view their own appointments
- Can cancel their appointments

### Admin (Role: "admin")
- Can do everything patients can do
- Can manage appointments (approve, reject, complete)
- Can manage doctors (add new, view all)
- Can access admin dashboard
- Can filter and view all appointments
- Can apply discount or set consultation fees

---

## Appointment Status Flow

```
pending → approved → completed
       ↘ rejected
       ↘ cancelled
```

- **pending**: Appointment just booked, awaiting admin approval
- **approved**: Admin has approved the appointment
- **completed**: Appointment has been completed
- **rejected**: Admin has rejected the appointment with reason
- **cancelled**: Patient cancelled the appointment

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Server Error

Error Response Format:
```json
{
  "message": "Error description",
  "error": "Additional error details (development only)"
}
```

---

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storage
2. **JWT Authentication**: All protected routes require valid JWT token
3. **Role-Based Access Control**: Routes are protected by user roles
4. **Input Validation**: All inputs are validated before processing
5. **Email Unique Constraint**: Duplicate emails are prevented at database level

---

## Development Notes

1. In development, admin can be created via `/api/auth/setup-admin`
2. In production, add an endpoint protection or remove this endpoint after first admin setup
3. JWT tokens expire after 30 days
4. Password fields are never returned in API responses (select: false)
5. All timestamps are in ISO 8601 format

---

## Testing with Postman/Insomnia

1. Create collection "Hospital Appointment System"
2. First call: `POST /api/auth/setup-admin` to create admin
3. Save returned token in Postman environment variable: `{{token}}`
4. Use this token in Authorization header for all protected routes
5. Follow endpoint documentation above for request/response examples

---

## Future Enhancements

- Payment gateway integration
- Email notifications
- SMS reminders
- Appointment cancellation fees
- Doctor availability calendar
- Patient feedback/ratings
- Prescription management
- Medical records
