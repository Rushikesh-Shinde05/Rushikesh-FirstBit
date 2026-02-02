// Timetable Service
// Port: 5005
// Run: node services/timetable-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nexanovadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Timetable Service: MongoDB Connected'))
  .catch(err => console.log('❌ Timetable Service: MongoDB Error:', err));

// Service URLs (internal communication)
const SERVICES = {
  ENROLLMENT: 'http://localhost:5004',
  SCHEDULING: 'http://localhost:5003',
  COURSE: 'http://localhost:5002',
  USER: 'http://localhost:5001'
};

// ========== HELPER FUNCTIONS ==========

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

function getCurrentWeekId() {
  const today = new Date();
  const year = today.getFullYear();
  const weekNumber = getWeekNumber(today);
  return `WEEK_${year}_${weekNumber}`;
}

// ========== TIMETABLE ENDPOINTS ==========

// Get Student's Weekly Timetable
app.get('/api/timetable/student/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { weekId } = req.query;

    // Use current week if not specified
    const targetWeekId = weekId || getCurrentWeekId();

    // Step 1: Get student's enrolled courses
    const enrollmentResponse = await axios.get(
      `${SERVICES.ENROLLMENT}/api/enrollments/student/${studentId}/courses`
    );

    const enrollments = enrollmentResponse.data.enrollments || [];
    
    if (enrollments.length === 0) {
      return res.json({
        studentId,
        weekId: targetWeekId,
        message: 'No enrollments found',
        timetable: []
      });
    }

    // Get active course IDs
    const activeCourseIds = enrollments
      .filter(e => e.status === 'active')
      .map(e => e.courseId);

    if (activeCourseIds.length === 0) {
      return res.json({
        studentId,
        weekId: targetWeekId,
        message: 'No active enrollments',
        timetable: []
      });
    }

    // Step 2: Get schedule for the week
    let schedule;
    try {
      const scheduleResponse = await axios.get(
        `${SERVICES.SCHEDULING}/api/schedule/${targetWeekId}`
      );
      schedule = scheduleResponse.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return res.status(404).json({
          error: 'No schedule found for this week',
          weekId: targetWeekId,
          suggestion: 'Contact admin to create a schedule for this week'
        });
      }
      throw error;
    }

    // Step 3: Filter slots for student's enrolled courses
    const studentSlots = schedule.slots.filter(slot => 
      slot.isAllocated && activeCourseIds.includes(slot.courseId)
    );

    // Step 4: Group by day for better presentation
    const timetableByDay = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

    studentSlots.forEach(slot => {
      timetableByDay[slot.day].push({
        timeSlot: slot.timeSlot,
        module: slot.moduleName,
        moduleId: slot.moduleId,
        trainer: slot.trainerName,
        trainerId: slot.trainerId,
        course: slot.courseName,
        courseId: slot.courseId
      });
    });

    res.json({
      studentId,
      weekId: targetWeekId,
      weekStartDate: schedule.weekStartDate,
      weekEndDate: schedule.weekEndDate,
      totalClasses: studentSlots.length,
      enrolledCourses: enrollments.length,
      timetable: timetableByDay
    });
  } catch (error) {
    console.error('Get timetable error:', error);
    res.status(500).json({ 
      error: 'Failed to generate timetable',
      details: error.message 
    });
  }
});

// Get Timetable for Multiple Weeks
app.get('/api/timetable/student/:studentId/weeks', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { startWeek, endWeek } = req.query;

    if (!startWeek || !endWeek) {
      return res.status(400).json({ 
        error: 'startWeek and endWeek parameters are required' 
      });
    }

    // Get all schedules in date range
    const schedulesResponse = await axios.get(
      `${SERVICES.SCHEDULING}/api/schedule`
    );

    const schedules = schedulesResponse.data;

    // Get student's enrolled courses
    const enrollmentResponse = await axios.get(
      `${SERVICES.ENROLLMENT}/api/enrollments/student/${studentId}/courses`
    );

    const enrollments = enrollmentResponse.data.enrollments || [];
    const activeCourseIds = enrollments
      .filter(e => e.status === 'active')
      .map(e => e.courseId);

    // Filter and process schedules
    const weeklyTimetables = schedules
      .filter(schedule => schedule.weekId >= startWeek && schedule.weekId <= endWeek)
      .map(schedule => {
        const studentSlots = schedule.slots.filter(slot => 
          slot.isAllocated && activeCourseIds.includes(slot.courseId)
        );

        return {
          weekId: schedule.weekId,
          weekStartDate: schedule.weekStartDate,
          weekEndDate: schedule.weekEndDate,
          totalClasses: studentSlots.length,
          slots: studentSlots
        };
      });

    res.json({
      studentId,
      weeks: weeklyTimetables.length,
      timetables: weeklyTimetables
    });
  } catch (error) {
    console.error('Get multi-week timetable error:', error);
    res.status(500).json({ 
      error: 'Failed to generate multi-week timetable',
      details: error.message 
    });
  }
});

// Get Timetable Summary for Student
app.get('/api/timetable/student/:studentId/summary', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const weekId = getCurrentWeekId();

    // Get student's timetable
    const timetableResponse = await axios.get(
      `http://localhost:${PORT}/api/timetable/student/${studentId}?weekId=${weekId}`
    );

    const timetable = timetableResponse.data;

    // Calculate statistics
    const daysWithClasses = Object.keys(timetable.timetable || {})
      .filter(day => timetable.timetable[day].length > 0).length;

    // Get unique courses and trainers
    const uniqueCourses = new Set();
    const uniqueTrainers = new Set();

    Object.values(timetable.timetable || {}).forEach(daySlots => {
      daySlots.forEach(slot => {
        uniqueCourses.add(slot.courseId);
        uniqueTrainers.add(slot.trainerId);
      });
    });

    res.json({
      studentId,
      weekId,
      totalClasses: timetable.totalClasses || 0,
      daysWithClasses,
      uniqueCourses: uniqueCourses.size,
      uniqueTrainers: uniqueTrainers.size,
      enrolledCourses: timetable.enrolledCourses || 0
    });
  } catch (error) {
    console.error('Get timetable summary error:', error);
    res.status(500).json({ 
      error: 'Failed to generate timetable summary',
      details: error.message 
    });
  }
});

// Get Timetable for Course (All enrolled students)
app.get('/api/timetable/course/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const weekId = req.query.weekId || getCurrentWeekId();

    // Get schedule for the week
    const scheduleResponse = await axios.get(
      `${SERVICES.SCHEDULING}/api/schedule/${weekId}`
    );

    const schedule = scheduleResponse.data;

    // Filter slots for this course
    const courseSlots = schedule.slots.filter(slot => 
      slot.isAllocated && slot.courseId === courseId
    );

    // Get enrolled students count
    const enrollmentResponse = await axios.get(
      `${SERVICES.ENROLLMENT}/api/enrollments/course/${courseId}/students`
    );

    const enrolledStudents = enrollmentResponse.data.totalStudents || 0;

    res.json({
      courseId,
      weekId,
      enrolledStudents,
      totalSlots: courseSlots.length,
      slots: courseSlots
    });
  } catch (error) {
    console.error('Get course timetable error:', error);
    res.status(500).json({ 
      error: 'Failed to generate course timetable',
      details: error.message 
    });
  }
});

// Get Timetable for Trainer
app.get('/api/timetable/trainer/:trainerId', async (req, res) => {
  try {
    const trainerId = req.params.trainerId;
    const weekId = req.query.weekId || getCurrentWeekId();

    // Get schedule for the week
    const scheduleResponse = await axios.get(
      `${SERVICES.SCHEDULING}/api/schedule/${weekId}`
    );

    const schedule = scheduleResponse.data;

    // Filter slots for this trainer
    const trainerSlots = schedule.slots.filter(slot => 
      slot.isAllocated && slot.trainerId === trainerId
    );

    // Group by day
    const timetableByDay = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

    trainerSlots.forEach(slot => {
      timetableByDay[slot.day].push({
        timeSlot: slot.timeSlot,
        module: slot.moduleName,
        course: slot.courseName,
        courseId: slot.courseId
      });
    });

    res.json({
      trainerId,
      weekId,
      totalClasses: trainerSlots.length,
      timetable: timetableByDay
    });
  } catch (error) {
    console.error('Get trainer timetable error:', error);
    res.status(500).json({ 
      error: 'Failed to generate trainer timetable',
      details: error.message 
    });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({ service: 'Timetable Service', status: 'running', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`📊 Timetable Service running on http://localhost:${PORT}`);
});