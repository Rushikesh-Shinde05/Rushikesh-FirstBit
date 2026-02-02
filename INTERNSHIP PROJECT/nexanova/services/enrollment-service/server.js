// ENROLLMENT SERVICE
// Port: 5004
// Location: services/enrollment-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nexanovadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Enrollment Service: MongoDB Connected'))
  .catch(err => console.log('❌ Enrollment Service: MongoDB Error:', err));

// ========== SCHEMAS ==========

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: String,
  studentEmail: String,
  courseId: { type: String, required: true },
  courseName: String,
  enrollmentDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'dropped', 'suspended'], 
    default: 'active' 
  },
  completionDate: Date,
  progress: { type: Number, default: 0 }
}, { timestamps: true });

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// ========== ENROLLMENT ENDPOINTS ==========

// Enroll Single Student in Course
app.post('/api/enrollments', async (req, res) => {
  try {
    const { studentId, studentName, studentEmail, courseId, courseName } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ error: 'Student ID and Course ID are required' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ 
      studentId, 
      courseId,
      status: { $in: ['active', 'suspended'] }
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        error: 'Student is already enrolled in this course',
        enrollment: existingEnrollment
      });
    }

    const enrollmentId = `ENR_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newEnrollment = new Enrollment({
      enrollmentId,
      studentId,
      studentName,
      studentEmail,
      courseId,
      courseName
    });

    await newEnrollment.save();

    res.status(201).json({
      message: 'Student enrolled successfully',
      enrollment: newEnrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll student' });
  }
});

// Bulk Enroll Students in Course
app.post('/api/enrollments/bulk', async (req, res) => {
  try {
    const { studentIds, courseId, courseName } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ error: 'Student IDs array is required' });
    }

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const results = {
      success: [],
      failed: [],
      alreadyEnrolled: []
    };

    for (const studentId of studentIds) {
      try {
        const existingEnrollment = await Enrollment.findOne({ 
          studentId, 
          courseId,
          status: { $in: ['active', 'suspended'] }
        });

        if (existingEnrollment) {
          results.alreadyEnrolled.push({
            studentId,
            enrollmentId: existingEnrollment.enrollmentId
          });
          continue;
        }

        const enrollmentId = `ENR_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const newEnrollment = new Enrollment({
          enrollmentId,
          studentId,
          courseId,
          courseName
        });

        await newEnrollment.save();

        results.success.push({
          studentId,
          enrollmentId
        });
      } catch (error) {
        results.failed.push({
          studentId,
          error: error.message
        });
      }
    }

    res.status(201).json({
      message: `Bulk enrollment completed: ${results.success.length} enrolled, ${results.alreadyEnrolled.length} already enrolled, ${results.failed.length} failed`,
      results
    });
  } catch (error) {
    console.error('Bulk enrollment error:', error);
    res.status(500).json({ error: 'Failed to process bulk enrollment' });
  }
});

// Get All Courses for a Student
app.get('/api/enrollments/student/:studentId/courses', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      studentId: req.params.studentId 
    }).sort({ enrollmentDate: -1 });

    res.json({
      studentId: req.params.studentId,
      totalCourses: enrollments.length,
      enrollments
    });
  } catch (error) {
    console.error('Get student enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Get All Students for a Course
app.get('/api/enrollments/course/:courseId/students', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      courseId: req.params.courseId 
    }).sort({ enrollmentDate: -1 });

    res.json({
      courseId: req.params.courseId,
      totalStudents: enrollments.length,
      enrollments
    });
  } catch (error) {
    console.error('Get course enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Get Enrollment by ID
app.get('/api/enrollments/:enrollmentId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ 
      enrollmentId: req.params.enrollmentId 
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    console.error('Get enrollment error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
});

// Update Enrollment Status
app.put('/api/enrollments/:enrollmentId/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['active', 'completed', 'dropped', 'suspended'].includes(status)) {
      return res.status(400).json({ 
        error: 'Valid status is required (active, completed, dropped, suspended)' 
      });
    }

    const updateData = { status };
    
    if (status === 'completed') {
      updateData.completionDate = new Date();
      updateData.progress = 100;
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId: req.params.enrollmentId },
      updateData,
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      message: 'Enrollment status updated successfully',
      enrollment
    });
  } catch (error) {
    console.error('Update enrollment status error:', error);
    res.status(500).json({ error: 'Failed to update enrollment status' });
  }
});

// Update Enrollment Progress
app.put('/api/enrollments/:enrollmentId/progress', async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({ 
        error: 'Progress must be a number between 0 and 100' 
      });
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId: req.params.enrollmentId },
      { progress },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      message: 'Enrollment progress updated successfully',
      enrollment
    });
  } catch (error) {
    console.error('Update enrollment progress error:', error);
    res.status(500).json({ error: 'Failed to update enrollment progress' });
  }
});

// Delete Enrollment
app.delete('/api/enrollments/:enrollmentId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({ 
      enrollmentId: req.params.enrollmentId 
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({ 
      message: 'Student unenrolled successfully',
      enrollment
    });
  } catch (error) {
    console.error('Delete enrollment error:', error);
    res.status(500).json({ error: 'Failed to unenroll student' });
  }
});

// Get All Enrollments
app.get('/api/enrollments', async (req, res) => {
  try {
    const { status, courseId, studentId } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    if (studentId) filter.studentId = studentId;

    const enrollments = await Enrollment.find(filter).sort({ enrollmentDate: -1 });

    res.json({
      totalEnrollments: enrollments.length,
      enrollments
    });
  } catch (error) {
    console.error('Get all enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Get Enrollment Statistics
app.get('/api/enrollments/stats/summary', async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
    const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });
    const droppedEnrollments = await Enrollment.countDocuments({ status: 'dropped' });

    const courseStats = await Enrollment.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$courseId', count: { $sum: 1 }, courseName: { $first: '$courseName' } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      total: totalEnrollments,
      active: activeEnrollments,
      completed: completedEnrollments,
      dropped: droppedEnrollments,
      courseStats
    });
  } catch (error) {
    console.error('Get enrollment stats error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment statistics' });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({ service: 'Enrollment Service', status: 'running', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`📝 Enrollment Service running on http://localhost:${PORT}`);
});