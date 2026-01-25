@echo off
REM Hospital Appointment Booking System - Quick Start Script (Windows)
REM This script helps you set up the entire MERN application on Windows

cls
echo.
echo ════════════════════════════════════════════════════════════════
echo    Hospital Appointment Booking System - MERN Stack
echo    Quick Setup ^& Start Guide (Windows)
echo ════════════════════════════════════════════════════════════════
echo.

REM Check if Node.js is installed
echo Checking prerequisites...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)
echo [OK] Node.js is installed
echo.

REM Backend Setup
echo ═══ BACKEND SETUP ═══
echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo [WARNING] Please update .env with your MongoDB URI and JWT secret
) else (
    echo [OK] .env file already exists
)
echo.

REM Frontend Setup
echo ═══ FRONTEND SETUP ═══
cd frontend
echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..
echo.

REM Display next steps
echo ════════════════════════════════════════════════════════════════
echo                    SETUP COMPLETE!
echo ════════════════════════════════════════════════════════════════
echo.

echo NEXT STEPS:
echo.
echo 1. Configure Environment Variables
echo    Edit .env file with your MongoDB URI and JWT secret
echo    Example:
echo    MONGODB_URI=mongodb://localhost:27017/hospital-appointment-system
echo    JWT_SECRET=your_super_secret_key_change_in_production
echo.

echo 2. Start MongoDB
echo    If using local MongoDB, start the MongoDB service
echo    Or use MongoDB Atlas cloud database
echo.

echo 3. Start Backend Server
echo    In terminal/PowerShell, run: npm run dev
echo    Backend will run on: http://localhost:5000
echo.

echo 4. Start Frontend Server (in another terminal)
echo    In terminal/PowerShell, run: cd frontend ^&^& npm start
echo    Frontend will run on: http://localhost:3000
echo.

echo 5. Setup Admin Account
echo    Make a POST request to http://localhost:5000/api/auth/setup-admin
echo    Use Postman or curl with this data:
echo    {
echo      "firstName": "John",
echo      "lastName": "Admin",
echo      "email": "admin@hospital.com",
echo      "password": "Admin@123",
echo      "phone": "+1234567890"
echo    }
echo.

echo USEFUL COMMANDS:
echo.
echo Backend:
echo   npm run dev        - Start backend with nodemon
echo   npm start          - Start backend in production
echo.
echo Frontend:
echo   cd frontend
echo   npm start          - Start React app
echo   npm build          - Build for production
echo.

echo DOCUMENTATION:
echo   - API_DOCUMENTATION.md - Complete API reference
echo   - COMPLETE_SETUP_GUIDE.md - Full setup guide
echo   - PROJECT_SUMMARY.md - Project overview
echo.

echo DEFAULT CREDENTIALS (for testing):
echo   Admin Email: admin@hospital.com
echo   Admin Password: Admin@123
echo.

echo Happy Coding! 🚀
echo.
pause
