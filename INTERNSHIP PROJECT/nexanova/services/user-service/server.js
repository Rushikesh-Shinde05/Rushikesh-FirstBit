// USER MANAGEMENT & AUTHENTICATION SERVICE
// Port: 5001
// Location: services/user-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5001;
const JWT_SECRET = 'nexanova_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nexanovadb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ User Service: MongoDB Connected'))
  .catch(err => console.log('❌ User Service: MongoDB Error:', err));

// ========== SCHEMAS ==========

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'trainer'], required: true },
  rollNumber: String,
  employeeId: String,
  phone: String,
  isActive: { type: Boolean, default: true },
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  email: String,
  phone: String
}, { timestamps: true });

const Trainer = mongoose.model('Trainer', trainerSchema);

// ========== AUTHENTICATION ENDPOINTS ==========

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, rollNumber, employeeId } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newUser = new User({
      userId,
      name,
      email,
      password: hashedPassword,
      role,
      rollNumber: role === 'student' ? rollNumber : undefined,
      employeeId: role === 'trainer' ? employeeId : undefined
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId,
      email,
      role
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = Math.random().toString(36).substr(2, 10).toUpperCase();
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    res.json({
      message: 'Password reset token generated',
      resetToken,
      note: 'In production, this would be sent via email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// ========== USER MANAGEMENT ENDPOINTS ==========

// Bulk Upload Students (CSV)
app.post('/api/users/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];
    const errors = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        let successCount = 0;

        for (const row of results) {
          try {
            const { name, email, password, rollNumber } = row;

            const existing = await User.findOne({ email });
            if (existing) {
              errors.push({ email, error: 'User already exists' });
              continue;
            }

            const hashedPassword = await bcrypt.hash(password || 'Welcome123', 10);
            const userId = `STU_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            await User.create({
              userId,
              name,
              email,
              password: hashedPassword,
              role: 'student',
              rollNumber
            });

            successCount++;
          } catch (err) {
            errors.push({ email: row.email, error: err.message });
          }
        }

        fs.unlinkSync(req.file.path);

        res.json({
          message: `Bulk upload completed: ${successCount} students added`,
          successCount,
          errorCount: errors.length,
          errors: errors.slice(0, 10)
        });
      });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ error: 'Bulk upload failed' });
  }
});

// Get All Trainers
app.get('/api/users/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
});

// Get All Students
app.get('/api/users/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get User by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ========== TRAINER MANAGEMENT (Legacy Support) ==========

app.post('/trainers', async (req, res) => {
  try {
    const { name, empId, subject } = req.body;
    
    const existingTrainer = await Trainer.findOne({ empId });
    if (existingTrainer) {
      return res.status(400).json({ error: 'Trainer with this Employee ID already exists' });
    }
    
    const newTrainer = new Trainer({ name, empId, subject });
    await newTrainer.save();
    
    res.json({ message: `✅ Trainer ${name} added successfully!` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add trainer' });
  }
});

app.get('/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
});

app.get('/trainers/:empId', async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ empId: req.params.empId });
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainer' });
  }
});

app.delete('/trainers/:empId', async (req, res) => {
  try {
    const result = await Trainer.deleteOne({ empId: req.params.empId });
    if (result.deletedCount === 0) {
      return res.json({ message: '⚠️ Trainer not found' });
    }
    res.json({ message: '✅ Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({ service: 'User Management Service', status: 'running', port: PORT });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🔐 User Service running on http://localhost:${PORT}`);
});