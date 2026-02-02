// Course Management Service
// Port: 5002
// Run: node server.js
// Location: services/course-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nexanovadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Course Service: MongoDB Connected'))
  .catch(err => console.log('❌ Course Service: MongoDB Error:', err));

// ========== SCHEMAS ==========

const moduleSchema = new mongoose.Schema({
  moduleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  courseId: { type: String, required: true },
  description: String,
  duration: { type: String, default: '3 hours' },
  trainers: [{ type: String }], // Array of trainer empIds
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  duration: String,
  modules: [{ type: String }], // Array of moduleIds
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

// ========== COURSE ENDPOINTS ==========

// Create Course
app.post('/api/courses', async (req, res) => {
  try {
    const { name, description, duration } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Course name is required' });
    }

    // Generate courseId
    const courseId = `CRS_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newCourse = new Course({
      courseId,
      name,
      description,
      duration,
      modules: []
    });

    await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Get All Courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 });
    
    // Populate module details
    const coursesWithModules = await Promise.all(
      courses.map(async (course) => {
        const modules = await Module.find({ 
          moduleId: { $in: course.modules } 
        }).sort({ order: 1 });
        
        return {
          ...course.toObject(),
          moduleDetails: modules
        };
      })
    );

    res.json(coursesWithModules);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get Course by ID
app.get('/api/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      courseId: req.params.courseId,
      isActive: true 
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get module details
    const modules = await Module.find({ 
      moduleId: { $in: course.modules } 
    }).sort({ order: 1 });

    res.json({
      ...course.toObject(),
      moduleDetails: modules
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Update Course
app.put('/api/courses/:courseId', async (req, res) => {
  try {
    const { name, description, duration } = req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId: req.params.courseId },
      { name, description, duration },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete Course (Soft Delete)
app.delete('/api/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { courseId: req.params.courseId },
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// ========== MODULE ENDPOINTS ==========

// Get Modules for a Course
app.get('/api/courses/:courseId/modules', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      courseId: req.params.courseId,
      isActive: true 
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const modules = await Module.find({ 
      moduleId: { $in: course.modules } 
    }).sort({ order: 1 });

    res.json(modules);
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

// Add Module to Course
app.post('/api/courses/:courseId/modules', async (req, res) => {
  try {
    const { name, description, duration, trainers } = req.body;
    const courseId = req.params.courseId;

    // Check if course exists
    const course = await Course.findOne({ courseId, isActive: true });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Module name is required' });
    }

    // Generate moduleId
    const moduleId = `MOD_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Get current module count for order
    const moduleCount = course.modules.length;

    const newModule = new Module({
      moduleId,
      name,
      courseId,
      description,
      duration: duration || '3 hours',
      trainers: trainers || [],
      order: moduleCount + 1
    });

    await newModule.save();

    // Add module to course
    course.modules.push(moduleId);
    await course.save();

    res.status(201).json({
      message: 'Module added successfully',
      module: newModule
    });
  } catch (error) {
    console.error('Add module error:', error);
    res.status(500).json({ error: 'Failed to add module' });
  }
});

// Update Module
app.put('/api/modules/:moduleId', async (req, res) => {
  try {
    const { name, description, duration, trainers } = req.body;

    const updatedModule = await Module.findOneAndUpdate(
      { moduleId: req.params.moduleId },
      { name, description, duration, trainers },
      { new: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json({
      message: 'Module updated successfully',
      module: updatedModule
    });
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({ error: 'Failed to update module' });
  }
});

// Delete Module
app.delete('/api/modules/:moduleId', async (req, res) => {
  try {
    const moduleId = req.params.moduleId;

    // Find and delete module
    const module = await Module.findOneAndDelete({ moduleId });
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Remove module from course
    await Course.updateOne(
      { courseId: module.courseId },
      { $pull: { modules: moduleId } }
    );

    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({ error: 'Failed to delete module' });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({ 
    service: 'Course Management Service', 
    status: 'running', 
    port: PORT 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`📚 Course Service running on http://localhost:${PORT}`);
});