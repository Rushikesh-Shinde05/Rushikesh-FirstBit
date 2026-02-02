@echo off
echo ==========================================
echo  NexaNova LMS - Complete Startup
echo ==========================================
echo.

REM Start MongoDB first
echo [1/8] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db"
timeout /t 8 >nul

REM Start User Service
echo [2/8] Starting User Service...
start "User Service" cmd /k "cd services\user-service && npm start"
timeout /t 6 >nul

REM Start Course Service
echo [3/8] Starting Course Service...
start "Course Service" cmd /k "cd services\cource-service && npm start"
timeout /t 4 >nul

REM Start Scheduling Service
echo [4/8] Starting Scheduling Service...
start "Scheduling Service" cmd /k "cd services\sceduling-service && npm start"
timeout /t 4 >nul

REM Start Enrollment Service
echo [5/8] Starting Enrollment Service...
start "Enrollment Service" cmd /k "cd services\enrollment-service && npm start"
timeout /t 4 >nul

REM Start Timetable Service
echo [6/8] Starting Timetable Service...
start "Timetable Service" cmd /k "cd services\timetable-service && npm start"
timeout /t 4 >nul

REM Start API Gateway
echo [7/8] Starting API Gateway...
start "API Gateway" cmd /k "cd api-gatway && npm start"
timeout /t 4 >nul

REM Open Frontend
echo [8/8] Opening Frontend...
start "" "frontend\index_html.html"

echo.
echo ==========================================
echo  ALL DONE! Everything is running!
echo ==========================================
echo.
echo You should see 7 terminal windows open:
echo  - MongoDB
echo  - User Service (5001)
echo  - Course Service (5002)  
echo  - Scheduling Service (5003)
echo  - Enrollment Service (5004)
echo  - Timetable Service (5005)
echo  - API Gateway (3000)
echo.
echo Your browser should open automatically!
echo.
pause