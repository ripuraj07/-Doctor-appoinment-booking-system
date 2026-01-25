@echo off
REM Quick start script for Appointment Booking System

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║      Appointment Booking System - Quick Start             ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if npm packages are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Start server and tests in parallel
echo Starting server...
start "Server" cmd /k "node server.js"

timeout /t 3

echo Running appointment booking test...
node test-booking.js

if %errorlevel% equ 0 (
    echo.
    echo ✓ All tests passed!
    echo.
    echo Open browser and visit:
    echo   - http://localhost:5000/user  (User Dashboard)
    echo   - http://localhost:5000/admin (Admin Dashboard)
    echo.
) else (
    echo.
    echo ✗ Tests failed. Check the server window for error messages.
    echo.
)

pause
