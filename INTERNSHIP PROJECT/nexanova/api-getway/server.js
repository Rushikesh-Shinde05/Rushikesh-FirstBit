// API Gateway - server.js
// Port: 3000
// Run: node server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Service URLs
const SERVICES = {
  USER: 'http://localhost:5001',
  COURSE: 'http://localhost:5002',
  SCHEDULING: 'http://localhost:5003',
  ENROLLMENT: 'http://localhost:5004',
  TIMETABLE: 'http://localhost:5005'
};

// JWT Secret
const JWT_SECRET = 'nexanova_secret_key_2024';

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('⚠️ No token provided');
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('⚠️ Invalid token:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin Role Check
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('⚠️ Non-admin user attempted admin action');
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Proxy Helper with Enhanced Error Handling
const proxyRequest = async (req, res, serviceUrl) => {
  try {
    const fullUrl = serviceUrl + req.path;
    console.log(`📡 Proxying to: ${fullUrl}`);
    
    const response = await axios({
      method: req.method,
      url: fullUrl,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'user-id': req.user?.userId,
        'user-role': req.user?.role
      },
      params: req.query,
      timeout: 10000 // 10 second timeout
    });
    
    console.log(`✅ Success: ${req.method} ${req.path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error(`❌ Service unavailable: ${serviceUrl}`);
      return res.status(503).json({ 
        error: 'Service temporarily unavailable',
        service: serviceUrl,
        suggestion: 'Please check if the microservice is running'
      });
    }
    
    if (error.code === 'ETIMEDOUT') {
      console.error(`❌ Request timeout: ${serviceUrl}${req.path}`);
      return res.status(504).json({ error: 'Request timeout' });
    }
    
    const status = error.response?.status || 500;
    const message = error.response?.data || { error: 'Service error' };
    console.error(`❌ Error ${status}:`, message);
    res.status(status).json(message);
  }
};

// ========== PUBLIC ROUTES ==========

// Health Check
app.get('/', (req, res) => {
  res.json({
    message: '🚀 NexaNova API Gateway',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    services: {
      user: SERVICES.USER,
      course: SERVICES.COURSE,
      scheduling: SERVICES.SCHEDULING,
      enrollment: SERVICES.ENROLLMENT,
      timetable: SERVICES.TIMETABLE
    }
  });
});

// Service Health Check
app.get('/health', async (req, res) => {
  const health = {
    gateway: 'running',
    services: {}
  };

  for (const [name, url] of Object.entries(SERVICES)) {
    try {
      await axios.get(url, { timeout: 2000 });
      health.services[name] = 'running';
    } catch (error) {
      health.services[name] = 'down';
    }
  }

  res.json(health);
});

// Auth Routes (Public)
app.post('/api/auth/register', (req, res) => proxyRequest(req, res, SERVICES.USER));
app.post('/api/auth/login', (req, res) => proxyRequest(req, res, SERVICES.USER));
app.post('/api/auth/forgot-password', (req, res) => proxyRequest(req, res, SERVICES.USER));

// ========== PROTECTED ROUTES ==========

// User Management Routes
app.post('/api/users/bulk-upload', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.USER));
app.get('/api/users/trainers', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.USER));
app.get('/api/users/students', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.USER));

// Course Management Routes
app.get('/api/courses', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.COURSE));
app.post('/api/courses', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.COURSE));
app.get('/api/courses/:courseId/modules', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.COURSE));
app.post('/api/courses/:courseId/modules', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.COURSE));

// Scheduling Routes - CRITICAL: Specific routes BEFORE parameterized routes!
app.post('/api/schedule', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.SCHEDULING));

// THIS MUST BE BEFORE /:weekId route!
app.get('/api/schedule/current/week', authenticateToken, (req, res) => {
  console.log('🔍 Current week schedule requested');
  return proxyRequest(req, res, SERVICES.SCHEDULING);
});

app.put('/api/schedule/slot/:slotId', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.SCHEDULING));

// Parameterized route comes LAST
app.get('/api/schedule/:weekId', authenticateToken, (req, res) => {
  console.log(`🔍 Schedule requested for week: ${req.params.weekId}`);
  return proxyRequest(req, res, SERVICES.SCHEDULING);
});

// Enrollment Routes
app.post('/api/enrollments', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.ENROLLMENT));
app.post('/api/enrollments/bulk', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.ENROLLMENT));
app.get('/api/enrollments/student/:studentId/courses', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.ENROLLMENT));
app.get('/api/enrollments/stats/summary', authenticateToken, requireAdmin, (req, res) => 
  proxyRequest(req, res, SERVICES.ENROLLMENT));

// Timetable Routes
app.get('/api/timetable/student/:studentId', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.TIMETABLE));
app.get('/api/timetable/student/:studentId/summary', authenticateToken, (req, res) => 
  proxyRequest(req, res, SERVICES.TIMETABLE));

// 404 Handler
app.use((req, res) => {
  console.log(`⚠️ Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('💥 Gateway Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 NexaNova API Gateway STARTED');
  console.log('========================================');
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('\n📡 Microservices:');
  console.log(`   ├─ User Service      : ${SERVICES.USER}`);
  console.log(`   ├─ Course Service    : ${SERVICES.COURSE}`);
  console.log(`   ├─ Scheduling Service: ${SERVICES.SCHEDULING}`);
  console.log(`   ├─ Enrollment Service: ${SERVICES.ENROLLMENT}`);
  console.log(`   └─ Timetable Service : ${SERVICES.TIMETABLE}`);
  console.log('\n✅ Ready to accept requests!');
  console.log('========================================\n');
});

module.exports = { JWT_SECRET };