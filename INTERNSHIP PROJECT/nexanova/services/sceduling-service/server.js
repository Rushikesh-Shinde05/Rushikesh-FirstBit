// ========================================
// SCHEDULING SERVICE - COMPLETE FILE
// ========================================
// Port: 5003
// Location: services/scheduling-service/server.js
// Purpose: Manages weekly schedules and time slot allocation

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nexanovadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Scheduling Service: MongoDB Connected'))
  .catch(err => console.log('❌ Scheduling Service: MongoDB Error:', err));

// ========== DATABASE SCHEMA ==========

const scheduleSchema = new mongoose.Schema({
  weekId: { type: String, required: true, unique: true },
  weekStartDate: { type: Date, required: true },
  weekEndDate: { type: Date, required: true },
  weekNumber: Number,
  year: Number,
  slots: [{
    slotId: { type: String, required: true, unique: true },
    day: { type: String, required: true }, // Monday, Tuesday, etc.
    timeSlot: { type: String, required: true }, // 8AM-11AM, 11AM-2PM, etc.
    moduleId: { type: String, default: null },
    moduleName: { type: String, default: null },
    trainerId: { type: String, default: null },
    trainerName: { type: String, default: null },
    courseId: { type: String, default: null },
    courseName: { type: String, default: null },
    isAllocated: { type: Boolean, default: false }
  }]
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

// ========== CONSTANTS ==========

// 4 time slots per day as per SRS requirements
const TIME_SLOTS = [
  '8AM-11AM',
  '11AM-2PM',
  '2PM-5PM',
  '5PM-8PM'
];

// 7 days of the week
const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

// ========== HELPER FUNCTIONS ==========

function getWeekDates(startDate) {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
}

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

// ========== API ENDPOINTS ==========

// CREATE BLANK WEEKLY SCHEDULE
// POST /api/schedule
// Creates a new schedule with 28 blank slots (7 days × 4 time slots)
app.post('/api/schedule', async (req, res) => {
  try {
    const { startDate } = req.body;

    if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
    }

    const { start, end } = getWeekDates(startDate);
    const weekNumber = getWeekNumber(start);
    const year = start.getFullYear();

    // Generate unique week ID
    const weekId = `WEEK_${year}_${weekNumber}`;

    // Check if schedule already exists
    const existingSchedule = await Schedule.findOne({ weekId });
    if (existingSchedule) {
      return res.status(400).json({ 
        error: 'Schedule already exists for this week',
        weekId,
        schedule: existingSchedule
      });
    }

    // Create 28 blank slots
    const slots = [];
    DAYS.forEach(day => {
      TIME_SLOTS.forEach(timeSlot => {
        slots.push({
          slotId: `${weekId}_${day.substr(0, 3).toUpperCase()}_${timeSlot.replace(/[^0-9A-Z]/g, '')}`,
          day,
          timeSlot,
          isAllocated: false
        });
      });
    });

    const newSchedule = new Schedule({
      weekId,
      weekStartDate: start,
      weekEndDate: end,
      weekNumber,
      year,
      slots
    });

    await newSchedule.save();

    res.status(201).json({
      message: 'Weekly schedule created successfully',
      schedule: newSchedule
    });
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// GET SCHEDULE BY WEEK ID
// GET /api/schedule/:weekId
app.get('/api/schedule/:weekId', async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ weekId: req.params.weekId });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json(schedule);
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// GET CURRENT WEEK SCHEDULE
// GET /api/schedule/current/week
app.get('/api/schedule/current/week', async (req, res) => {
  try {
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    const year = today.getFullYear();
    const weekId = `WEEK_${year}_${weekNumber}`;

    const schedule = await Schedule.findOne({ weekId });

    if (!schedule) {
      return res.status(404).json({ 
        error: 'No schedule found for current week',
        weekId,
        suggestion: 'Create a schedule for this week first'
      });
    }

    res.json(schedule);
  } catch (error) {
    console.error('Get current schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch current schedule' });
  }
});

// GET ALL SCHEDULES
// GET /api/schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ weekStartDate: -1 });
    res.json(schedules);
  } catch (error) {
    console.error('Get all schedules error:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// ALLOCATE TIME SLOT
// PUT /api/schedule/slot/:slotId
// Assigns a module and trainer to a specific time slot
app.put('/api/schedule/slot/:slotId', async (req, res) => {
  try {
    const { moduleId, moduleName, trainerId, trainerName, courseId, courseName } = req.body;
    const slotId = req.params.slotId;

    if (!moduleId || !trainerId) {
      return res.status(400).json({ error: 'Module ID and Trainer ID are required' });
    }

    // Find schedule containing this slot
    const schedule = await Schedule.findOne({ 'slots.slotId': slotId });

    if (!schedule) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Find the specific slot
    const slot = schedule.slots.find(s => s.slotId === slotId);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check trainer availability (no double-booking)
    const trainerBusy = schedule.slots.some(s => 
      s.trainerId === trainerId && 
      s.day === slot.day && 
      s.timeSlot === slot.timeSlot &&
      s.slotId !== slotId &&
      s.isAllocated
    );

    if (trainerBusy) {
      return res.status(400).json({ 
        error: 'Trainer is already assigned to another slot at this time' 
      });
    }

    // Update slot with allocation details
    slot.moduleId = moduleId;
    slot.moduleName = moduleName;
    slot.trainerId = trainerId;
    slot.trainerName = trainerName;
    slot.courseId = courseId;
    slot.courseName = courseName;
    slot.isAllocated = true;

    await schedule.save();

    res.json({
      message: 'Slot allocated successfully',
      slot
    });
  } catch (error) {
    console.error('Allocate slot error:', error);
    res.status(500).json({ error: 'Failed to allocate slot' });
  }
});

// DEALLOCATE TIME SLOT
// DELETE /api/schedule/slot/:slotId
// Clears allocation from a time slot
app.delete('/api/schedule/slot/:slotId', async (req, res) => {
  try {
    const slotId = req.params.slotId;

    const schedule = await Schedule.findOne({ 'slots.slotId': slotId });

    if (!schedule) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    const slot = schedule.slots.find(s => s.slotId === slotId);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Clear slot allocation
    slot.moduleId = null;
    slot.moduleName = null;
    slot.trainerId = null;
    slot.trainerName = null;
    slot.courseId = null;
    slot.courseName = null;
    slot.isAllocated = false;

    await schedule.save();

    res.json({
      message: 'Slot deallocated successfully',
      slot
    });
  } catch (error) {
    console.error('Deallocate slot error:', error);
    res.status(500).json({ error: 'Failed to deallocate slot' });
  }
});

// GET TRAINER SCHEDULE
// GET /api/schedule/:weekId/trainer/:trainerId
app.get('/api/schedule/:weekId/trainer/:trainerId', async (req, res) => {
  try {
    const { weekId, trainerId } = req.params;

    const schedule = await Schedule.findOne({ weekId });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const trainerSlots = schedule.slots.filter(slot => 
      slot.trainerId === trainerId && slot.isAllocated
    );

    res.json({
      weekId,
      trainerId,
      slots: trainerSlots,
      totalSlots: trainerSlots.length
    });
  } catch (error) {
    console.error('Get trainer schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch trainer schedule' });
  }
});

// DELETE ENTIRE SCHEDULE
// DELETE /api/schedule/:weekId
app.delete('/api/schedule/:weekId', async (req, res) => {
  try {
    const result = await Schedule.deleteOne({ weekId: req.params.weekId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

// HEALTH CHECK
// GET /
app.get('/', (req, res) => {
  res.json({ 
    service: 'Scheduling Service', 
    status: 'running', 
    port: PORT,
    endpoints: {
      createSchedule: 'POST /api/schedule',
      getSchedule: 'GET /api/schedule/:weekId',
      getCurrentWeek: 'GET /api/schedule/current/week',
      allocateSlot: 'PUT /api/schedule/slot/:slotId',
      deallocateSlot: 'DELETE /api/schedule/slot/:slotId'
    }
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log('========================================');
  console.log('📅 Scheduling Service Started');
  console.log(`🌐 Running on: http://localhost:${PORT}`);
  console.log('========================================');
});