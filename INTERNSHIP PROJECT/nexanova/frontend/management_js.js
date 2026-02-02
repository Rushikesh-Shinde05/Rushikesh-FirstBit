// API Configuration - Now pointing to API Gateway
const API_URL = "http://localhost:3000/api";

// Current User State
let currentUser = null;
let currentToken = null;
let currentUserRole = null;

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function showAuth(role) {
  showPage(role === 'admin' ? 'adminAuthPage' : 'studentAuthPage');
}

function logout() {
  if(confirm('Are you sure you want to logout?')) {
    currentUser = null;
    currentToken = null;
    currentUserRole = null;
    localStorage.removeItem('nexanova_token');
    localStorage.removeItem('nexanova_user');
    showPage('landingPage');
    showMessage('adminMessage', 'Logged out successfully!', 'success');
  }
}

// ========== TAB NAVIGATION ==========
function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(tabName + 'Tab').classList.add('active');
}

// ========== AUTH FORM TOGGLES ==========
function toggleAdminAuth() {
  const loginForm = document.getElementById('adminLoginForm');
  const registerForm = document.getElementById('adminRegisterForm');
  const title = document.getElementById('adminAuthTitle');
  
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    title.textContent = 'Login to your account';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    title.textContent = 'Create your account';
  }
  document.getElementById('adminMessage').style.display = 'none';
}

function toggleStudentAuth() {
  const loginForm = document.getElementById('studentLoginForm');
  const registerForm = document.getElementById('studentRegisterForm');
  const title = document.getElementById('studentAuthTitle');
  
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    title.textContent = 'Login to your account';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    title.textContent = 'Create your account';
  }
  document.getElementById('studentMessage').style.display = 'none';
}

// ========== MESSAGE DISPLAY ==========
function showMessage(elementId, message, type) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
  messageEl.style.display = 'block';
  
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 5000);
}

// ========== OUTPUT DISPLAY ==========
function showOutput(elementId, data) {
  const outputEl = document.getElementById(elementId);
  
  if (typeof data === 'string') {
    outputEl.innerHTML = `<div class="message info">${data}</div>`;
    return;
  }
  
  if (data.error) {
    outputEl.innerHTML = `<div class="message error">${data.error}</div>`;
    return;
  }
  
  outputEl.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// ========== API HELPER ==========
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (currentToken) {
    options.headers['Authorization'] = `Bearer ${currentToken}`;
  }
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ========== AUTHENTICATION ==========

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('adminLoginEmail').value;
  const password = document.getElementById('adminLoginPassword').value;
  
  try {
    const data = await apiCall('/auth/login', 'POST', { email, password });
    
    if (data.user.role !== 'admin') {
      showMessage('adminMessage', 'Access denied! Admin credentials required.', 'error');
      return;
    }
    
    currentUser = data.user;
    currentToken = data.token;
    currentUserRole = 'admin';
    
    localStorage.setItem('nexanova_token', data.token);
    localStorage.setItem('nexanova_user', JSON.stringify(data.user));
    
    showMessage('adminMessage', 'Login successful! Loading portal...', 'success');
    
    setTimeout(() => {
      document.getElementById('adminWelcome').textContent = `Welcome, ${data.user.name}!`;
      showPage('adminPortal');
      loadCoursesForDropdowns();
    }, 1500);
  } catch (error) {
    showMessage('adminMessage', 'Login failed: ' + error.message, 'error');
  }
});

// Admin Registration
document.getElementById('adminRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('adminRegName').value;
  const email = document.getElementById('adminRegEmail').value;
  const password = document.getElementById('adminRegPassword').value;
  
  try {
    await apiCall('/auth/register', 'POST', { name, email, password, role: 'admin' });
    
    showMessage('adminMessage', 'Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleAdminAuth();
      document.getElementById('adminRegisterForm').reset();
    }, 1500);
  } catch (error) {
    showMessage('adminMessage', 'Registration failed: ' + error.message, 'error');
  }
});

// Student Login
document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('studentLoginEmail').value;
  const password = document.getElementById('studentLoginPassword').value;
  
  try {
    const data = await apiCall('/auth/login', 'POST', { email, password });
    
    if (data.user.role !== 'student') {
      showMessage('studentMessage', 'Access denied! Student credentials required.', 'error');
      return;
    }
    
    currentUser = data.user;
    currentToken = data.token;
    currentUserRole = 'student';
    
    localStorage.setItem('nexanova_token', data.token);
    localStorage.setItem('nexanova_user', JSON.stringify(data.user));
    
    showMessage('studentMessage', 'Login successful! Loading portal...', 'success');
    
    setTimeout(() => {
      document.getElementById('studentWelcome').textContent = `Welcome back, ${data.user.name}!`;
      showPage('studentPortal');
      loadStudentStats();
    }, 1500);
  } catch (error) {
    showMessage('studentMessage', 'Login failed: ' + error.message, 'error');
  }
});

// Student Registration
document.getElementById('studentRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('studentRegName').value;
  const email = document.getElementById('studentRegEmail').value;
  const rollNumber = document.getElementById('studentRegRoll').value;
  const password = document.getElementById('studentRegPassword').value;
  
  try {
    await apiCall('/auth/register', 'POST', { name, email, password, role: 'student', rollNumber });
    
    showMessage('studentMessage', 'Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleStudentAuth();
      document.getElementById('studentRegisterForm').reset();
    }, 1500);
  } catch (error) {
    showMessage('studentMessage', 'Registration failed: ' + error.message, 'error');
  }
});

// ========== COURSE MANAGEMENT ==========

async function createCourse() {
  const name = document.getElementById('courseName').value.trim();
  const description = document.getElementById('courseDesc').value.trim();
  const duration = document.getElementById('courseDuration').value.trim();
  
  if (!name) {
    showOutput('coursesOutput', 'Course name is required');
    return;
  }
  
  try {
    const data = await apiCall('/courses', 'POST', { name, description, duration });
    
    // Beautiful success message
    let html = `
      <div class="summary-container">
        <h3 class="summary-title">✅ Course Created Successfully!</h3>
        
        <div class="info-box" style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-left: 4px solid #28a745;">
          <h4>📚 Course Details</h4>
          <p><strong>Course ID:</strong> <span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px; font-family: monospace;">${data.course.courseId}</span></p>
          <p><strong>Name:</strong> ${data.course.name}</p>
          <p><strong>Description:</strong> ${data.course.description || 'N/A'}</p>
          <p><strong>Duration:</strong> ${data.course.duration || 'N/A'}</p>
        </div>
        
        <div class="notice-box notice-success">
          <strong>🎉 Next Steps:</strong><br>
          • Add modules to this course using the "Module Management" section below<br>
          • The course is now available in dropdowns for scheduling and enrollment
        </div>
      </div>
    `;
    
    document.getElementById('coursesOutput').innerHTML = html;
    document.getElementById('courseName').value = '';
    document.getElementById('courseDesc').value = '';
    document.getElementById('courseDuration').value = '';
    loadCoursesForDropdowns();
  } catch (error) {
    showOutput('coursesOutput', { error: error.message });
  }
}

async function loadCourses() {
  try {
    const data = await apiCall('/courses', 'GET');
    
    if (data.length === 0) {
      document.getElementById('coursesOutput').innerHTML = `
        <div class="notice-box notice-warning">
          <strong>📢 No Courses Found</strong><br>
          Create your first course using the form above.
        </div>
      `;
      return;
    }
    
    let html = `
      <div class="summary-container">
        <h3 class="summary-title">📚 All Courses (${data.length})</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white;">
              <th style="padding: 15px; text-align: left; border-radius: 8px 0 0 0;">Course ID</th>
              <th style="padding: 15px; text-align: left;">Name</th>
              <th style="padding: 15px; text-align: center;">Duration</th>
              <th style="padding: 15px; text-align: center; border-radius: 0 8px 0 0;">Modules</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    data.forEach((course, index) => {
      html += `
        <tr style="background: ${index % 2 === 0 ? '#f8f9fa' : 'white'}; transition: background 0.3s ease;">
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-family: monospace; color: #667eea;">
            ${course.courseId}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            <strong>${course.name}</strong>
            ${course.description ? `<br><small style="color: #6c757d;">${course.description}</small>` : ''}
          </td>
          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">
            <span style="background: #667eea; color: white; padding: 5px 12px; border-radius: 15px; font-size: 13px;">
              ${course.duration || 'N/A'}
            </span>
          </td>
          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">
            <span style="background: ${course.modules.length > 0 ? '#4CAF50' : '#ff9800'}; color: white; padding: 5px 12px; border-radius: 50%; font-weight: bold;">
              ${course.modules.length}
            </span>
          </td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
    
    document.getElementById('coursesOutput').innerHTML = html;
  } catch (error) {
    showOutput('coursesOutput', { error: error.message });
  }
}

async function loadCoursesForDropdowns() {
  try {
    const data = await apiCall('/courses', 'GET');
    
    const selects = [
      'modulesCourseSelect',
      'slotCourseSelect',
      'enrollCourseSelect',
      'bulkEnrollCourseSelect'
    ];
    
    selects.forEach(selectId => {
      const select = document.getElementById(selectId);
      if (select) {
        select.innerHTML = '<option value="">Select Course</option>';
        data.forEach(course => {
          select.innerHTML += `<option value="${course.courseId}" data-name="${course.name}">${course.name}</option>`;
        });
      }
    });
  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

async function addModule() {
  const courseSelect = document.getElementById('modulesCourseSelect');
  const courseId = courseSelect.value;
  const courseName = courseSelect.options[courseSelect.selectedIndex].dataset.name;
  const name = document.getElementById('moduleName').value.trim();
  const description = document.getElementById('moduleDesc').value.trim();
  
  if (!courseId || !name) {
    showOutput('coursesOutput', 'Course and module name are required');
    return;
  }
  
  try {
    const data = await apiCall(`/courses/${courseId}/modules`, 'POST', { 
      name, 
      description,
      duration: '3 hours'
    });
    
    // Beautiful success message
    let html = `
      <div class="summary-container">
        <h3 class="summary-title">✅ Module Added Successfully!</h3>
        
        <div class="info-box" style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-left: 4px solid #28a745;">
          <h4>📖 Module Details</h4>
          <p><strong>Course:</strong> ${courseName}</p>
          <p><strong>Module ID:</strong> <span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 5px; font-family: monospace;">${data.module.moduleId}</span></p>
          <p><strong>Module Name:</strong> ${data.module.name}</p>
          <p><strong>Description:</strong> ${data.module.description || 'N/A'}</p>
          <p><strong>Duration:</strong> ${data.module.duration}</p>
        </div>
        
        <div class="notice-box notice-success">
          <strong>🎉 Module Ready!</strong><br>
          This module is now available for scheduling in time slots.
        </div>
      </div>
    `;
    
    document.getElementById('coursesOutput').innerHTML = html;
    document.getElementById('moduleName').value = '';
    document.getElementById('moduleDesc').value = '';
    loadModulesForSlot(courseId);
  } catch (error) {
    showOutput('coursesOutput', { error: error.message });
  }
}

// Load modules when course is selected for slot allocation
document.getElementById('slotCourseSelect')?.addEventListener('change', function() {
  const courseId = this.value;
  if (courseId) {
    loadModulesForSlot(courseId);
  }
});

async function loadModulesForSlot(courseId) {
  try {
    const data = await apiCall(`/courses/${courseId}/modules`, 'GET');
    const select = document.getElementById('slotModuleSelect');
    select.innerHTML = '<option value="">Select Module</option>';
    data.forEach(module => {
      select.innerHTML += `<option value="${module.moduleId}" data-name="${module.name}">${module.name}</option>`;
    });
  } catch (error) {
    console.error('Error loading modules:', error);
  }
}

// ========== SCHEDULE MANAGEMENT ==========

async function createSchedule() {
  const startDate = document.getElementById('scheduleStartDate').value;
  
  if (!startDate) {
    showOutput('scheduleOutput', 'Start date is required');
    return;
  }
  
  try {
    const data = await apiCall('/schedule', 'POST', { startDate });
    showOutput('scheduleOutput', `Schedule created: ${data.schedule.weekId} with ${data.schedule.slots.length} slots`);
  } catch (error) {
    showOutput('scheduleOutput', { error: error.message });
  }
}

async function loadCurrentSchedule() {
  try {
    const data = await apiCall('/schedule/current/week', 'GET');
    
    let html = `<h4>Week: ${data.weekId}</h4>`;
    html += `<p>From ${new Date(data.weekStartDate).toLocaleDateString()} to ${new Date(data.weekEndDate).toLocaleDateString()}</p>`;
    html += '<table><thead><tr><th>Slot ID</th><th>Day</th><th>Time</th><th>Module</th><th>Trainer</th><th>Status</th></tr></thead><tbody>';
    
    data.slots.forEach(slot => {
      html += `<tr>
        <td>${slot.slotId}</td>
        <td>${slot.day}</td>
        <td>${slot.timeSlot}</td>
        <td>${slot.moduleName || 'Not Allocated'}</td>
        <td>${slot.trainerName || 'N/A'}</td>
        <td>${slot.isAllocated ? '✅ Allocated' : '⚪ Available'}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('scheduleOutput').innerHTML = html;
  } catch (error) {
    showOutput('scheduleOutput', { error: error.message });
  }
}

async function allocateSlot() {
  const slotId = document.getElementById('slotId').value.trim();
  const courseSelect = document.getElementById('slotCourseSelect');
  const moduleSelect = document.getElementById('slotModuleSelect');
  const trainerId = document.getElementById('slotTrainerId').value.trim();
  const trainerName = document.getElementById('slotTrainerName').value.trim();
  
  const courseId = courseSelect.value;
  const courseName = courseSelect.options[courseSelect.selectedIndex].dataset.name;
  const moduleId = moduleSelect.value;
  const moduleName = moduleSelect.options[moduleSelect.selectedIndex].dataset.name;
  
  if (!slotId || !courseId || !moduleId || !trainerId || !trainerName) {
    showOutput('scheduleOutput', 'All fields are required');
    return;
  }
  
  try {
    const data = await apiCall(`/schedule/slot/${slotId}`, 'PUT', {
      moduleId,
      moduleName,
      trainerId,
      trainerName,
      courseId,
      courseName
    });
    showOutput('scheduleOutput', data);
    document.getElementById('slotId').value = '';
    document.getElementById('slotTrainerId').value = '';
    document.getElementById('slotTrainerName').value = '';
  } catch (error) {
    showOutput('scheduleOutput', { error: error.message });
  }
}

// ========== ENROLLMENT MANAGEMENT ==========

async function enrollStudent() {
  const studentId = document.getElementById('enrollStudentId').value.trim();
  const courseSelect = document.getElementById('enrollCourseSelect');
  const courseId = courseSelect.value;
  const courseName = courseSelect.options[courseSelect.selectedIndex].dataset.name;
  
  if (!studentId || !courseId) {
    showOutput('enrollmentOutput', 'Student ID and Course are required');
    return;
  }
  
  try {
    const data = await apiCall('/enrollments', 'POST', {
      studentId,
      courseId,
      courseName
    });
    showOutput('enrollmentOutput', data);
    document.getElementById('enrollStudentId').value = '';
  } catch (error) {
    showOutput('enrollmentOutput', { error: error.message });
  }
}

async function loadEnrollmentStats() {
  try {
    const data = await apiCall('/enrollments/stats/summary', 'GET');
    
    // Calculate percentages
    const activePercent = data.total > 0 ? Math.round((data.active / data.total) * 100) : 0;
    const completedPercent = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
    const droppedPercent = data.total > 0 ? Math.round((data.dropped / data.total) * 100) : 0;
    
    let html = `
      <div class="summary-container">
        <h3 class="summary-title">📊 Enrollment Statistics</h3>
        
        <div class="summary-grid">
          <div class="summary-card blue">
            <div class="summary-number">${data.total}</div>
            <div class="summary-label">📋 Total Enrollments</div>
          </div>
          
          <div class="summary-card green">
            <div class="summary-number">${data.active}</div>
            <div class="summary-label">✅ Active (${activePercent}%)</div>
          </div>
          
          <div class="summary-card">
            <div class="summary-number">${data.completed}</div>
            <div class="summary-label">🎓 Completed (${completedPercent}%)</div>
          </div>
          
          <div class="summary-card orange">
            <div class="summary-number">${data.dropped}</div>
            <div class="summary-label">⚠️ Dropped (${droppedPercent}%)</div>
          </div>
        </div>
        
        <div class="info-box" style="margin-top: 30px;">
          <h4>📚 Course-wise Enrollments</h4>
          ${data.courseStats.length === 0 ? '<p style="color: #6c757d; font-style: italic;">No course enrollments yet.</p>' : ''}
        </div>
        
        ${data.courseStats.length > 0 ? `
          <div style="margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white;">
                  <th style="padding: 15px; text-align: left; border-radius: 8px 0 0 0;">Course Name</th>
                  <th style="padding: 15px; text-align: center;">Students Enrolled</th>
                  <th style="padding: 15px; text-align: center; border-radius: 0 8px 0 0;">Percentage</th>
                </tr>
              </thead>
              <tbody>
                ${data.courseStats.map((course, index) => {
                  const percent = Math.round((course.count / data.active) * 100);
                  return `
                    <tr style="background: ${index % 2 === 0 ? '#f8f9fa' : 'white'};">
                      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                        <strong>${course.courseName}</strong>
                      </td>
                      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                        <span style="background: #4CAF50; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold;">
                          ${course.count}
                        </span>
                      </td>
                      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                          <div style="flex: 1; max-width: 200px; height: 8px; background: #e0e0e0; border-radius: 10px; overflow: hidden;">
                            <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, #4CAF50, #45a049);"></div>
                          </div>
                          <span style="font-weight: bold; color: #4CAF50; min-width: 45px;">${percent}%</span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}
        
        ${data.total === 0 ? `
          <div class="notice-box notice-warning">
            <strong>📢 No Enrollments Yet</strong><br>
            Start enrolling students to courses to see statistics here.
          </div>
        ` : `
          <div class="notice-box notice-success">
            <strong>✅ System Active</strong><br>
            Total of ${data.total} enrollments across ${data.courseStats.length} ${data.courseStats.length === 1 ? 'course' : 'courses'}.
            ${data.active} students currently active.
          </div>
        `}
      </div>
    `;
    
    document.getElementById('enrollmentOutput').innerHTML = html;
  } catch (error) {
    showOutput('enrollmentOutput', { error: error.message });
  }
}
// ========== TRAINER MANAGEMENT (CRUD) ==========

async function addTrainer() {
  const name = document.getElementById('trainerName').value.trim();
  const empId = document.getElementById('trainerId').value.trim();
  const subject = document.getElementById('trainerSubject').value.trim();

  if (!name || !empId || !subject) {
    showOutput('trainersOutput', 'All fields are required');
    return;
  }

  try {
    // Call legacy endpoint directly (bypasses API Gateway)
    const response = await fetch('http://localhost:5001/trainers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, empId, subject })
    });

    const data = await response.json();
    showOutput('trainersOutput', data);
    
    document.getElementById('trainerName').value = '';
    document.getElementById('trainerId').value = '';
    document.getElementById('trainerSubject').value = '';
    
    updateTrainerStats();
  } catch (error) {
    showOutput('trainersOutput', { error: error.message });
  }
}

async function getAllTrainers() {
  try {
    const response = await fetch('http://localhost:5001/trainers');
    const trainers = await response.json();
    
    if (trainers.length === 0) {
      showOutput('trainersOutput', 'No trainers found');
      return;
    }
    
    let html = '<table><thead><tr><th>👤 Name</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead><tbody>';
    trainers.forEach(t => {
      html += `<tr><td>${t.name}</td><td>${t.empId}</td><td>${t.subject}</td></tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('trainersOutput').innerHTML = html;
    updateTrainerStats();
  } catch (error) {
    showOutput('trainersOutput', { error: error.message });
  }
}

async function getTrainerById() {
  const empId = document.getElementById('getTrainerId').value.trim();
  
  if (!empId) {
    showOutput('trainersOutput', 'Please enter an Employee ID');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5001/trainers/${empId}`);
    const trainer = await response.json();
    
    if (trainer.error) {
      showOutput('trainersOutput', trainer);
      return;
    }
    
    let html = '<table><thead><tr><th>👤 Name</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead><tbody>';
    html += `<tr><td>${trainer.name}</td><td>${trainer.empId}</td><td>${trainer.subject}</td></tr>`;
    html += '</tbody></table>';
    
    document.getElementById('trainersOutput').innerHTML = html;
  } catch (error) {
    showOutput('trainersOutput', { error: error.message });
  }
}

async function getTrainerBySubject() {
  const subject = document.getElementById('getTrainerSubject').value.trim();
  
  if (!subject) {
    showOutput('trainersOutput', 'Please enter a subject name');
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/trainers');
    const trainers = await response.json();
    const filtered = trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
    
    if (filtered.length === 0) {
      showOutput('trainersOutput', { error: 'No trainers found for this subject' });
      return;
    }
    
    let html = '<table><thead><tr><th>👤 Name</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead><tbody>';
    filtered.forEach(t => {
      html += `<tr><td>${t.name}</td><td>${t.empId}</td><td>${t.subject}</td></tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('trainersOutput').innerHTML = html;
  } catch (error) {
    showOutput('trainersOutput', { error: error.message });
  }
}

async function deleteTrainer() {
  const empId = document.getElementById('deleteTrainerId').value.trim();
  
  if (!empId) {
    showOutput('trainersOutput', 'Please enter an Employee ID to delete');
    return;
  }

  if (!confirm(`Are you sure you want to delete trainer with ID: ${empId}?`)) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5001/trainers/${empId}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    showOutput('trainersOutput', data);
    
    document.getElementById('deleteTrainerId').value = '';
    updateTrainerStats();
  } catch (error) {
    showOutput('trainersOutput', { error: error.message });
  }
}

async function updateTrainerStats() {
  try {
    const response = await fetch('http://localhost:5001/trainers');
    const trainers = await response.json();
    document.getElementById('trainerCount').textContent = trainers.length || 0;
    
    const subjects = [...new Set(trainers.map(t => t.subject))];
    document.getElementById('subjectCount').textContent = subjects.length || 0;
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// ========== SUBJECT MANAGEMENT (OLD FEATURES RESTORED) ==========

async function addSubject() {
  const subjectName = document.getElementById('subjectName').value.trim();

  if (!subjectName) {
    showOutput('subjectsOutput', 'Please enter a subject name');
    return;
  }

  showOutput('subjectsOutput', `Subject "${subjectName}" noted! Add trainers for this subject in the Trainers tab.`);
  document.getElementById('subjectName').value = '';
  updateTrainerStats();
}

async function getAllSubjects() {
  try {
    const response = await fetch('http://localhost:5001/trainers');
    const trainers = await response.json();
    const subjects = [...new Set(trainers.map(t => t.subject))];
    
    if (subjects.length === 0) {
      showOutput('subjectsOutput', 'No subjects found');
      return;
    }
    
    let html = '<table><thead><tr><th>📚 Subject Name</th><th>👥 Trainer Count</th></tr></thead><tbody>';
    subjects.forEach(subject => {
      const count = trainers.filter(t => t.subject === subject).length;
      html += `<tr><td>${subject}</td><td>${count}</td></tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('subjectsOutput').innerHTML = html;
  } catch (error) {
    showOutput('subjectsOutput', { error: error.message });
  }
}

async function getSubjectDetails() {
  const subject = document.getElementById('subjectId').value.trim();
  
  if (!subject) {
    showOutput('subjectsOutput', 'Please enter a subject name');
    return;
  }

  try {
    const response = await fetch('http://localhost:5001/trainers');
    const trainers = await response.json();
    const filtered = trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
    
    if (filtered.length === 0) {
      showOutput('subjectsOutput', { error: 'Subject not found or no trainers assigned' });
      return;
    }
    
    let html = `<h4>📚 Subject: ${subject}</h4>`;
    html += `<p>Total Trainers: ${filtered.length}</p>`;
    html += '<table><thead><tr><th>👤 Trainer</th><th>🆔 Employee ID</th></tr></thead><tbody>';
    filtered.forEach(t => {
      html += `<tr><td>${t.name}</td><td>${t.empId}</td></tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('subjectsOutput').innerHTML = html;
  } catch (error) {
    showOutput('subjectsOutput', { error: error.message });
  }
}

// ========== STUDENT MANAGEMENT ==========

async function uploadCSV() {
  const fileInput = document.getElementById('csvFile');
  const file = fileInput.files[0];
  
  if (!file) {
    showOutput('studentsOutput', 'Please select a CSV file');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(`${API_URL}/users/bulk-upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentToken}`
      },
      body: formData
    });
    
    const data = await response.json();
    showOutput('studentsOutput', data);
    fileInput.value = '';
  } catch (error) {
    showOutput('studentsOutput', { error: error.message });
  }
}

async function loadAllStudents() {
  try {
    const data = await apiCall('/users/students', 'GET');
    
    let html = '<table><thead><tr><th>Name</th><th>Email</th><th>Roll Number</th><th>User ID</th></tr></thead><tbody>';
    data.forEach(student => {
      html += `<tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.rollNumber || 'N/A'}</td>
        <td>${student.userId}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    
    document.getElementById('studentsOutput').innerHTML = html;
  } catch (error) {
    showOutput('studentsOutput', { error: error.message });
  }
}

// ========== STUDENT PORTAL ==========

async function loadStudentStats() {
  if (!currentUser) return;
  
  try {
    const enrollments = await apiCall(`/enrollments/student/${currentUser.userId}/courses`, 'GET');
    document.getElementById('enrolledCount').textContent = enrollments.totalCourses || 0;
    
    const summary = await apiCall(`/timetable/student/${currentUser.userId}/summary`, 'GET');
    document.getElementById('weeklyClasses').textContent = summary.totalClasses || 0;
  } catch (error) {
    console.error('Error loading student stats:', error);
  }
}

async function loadMyTimetable() {
  if (!currentUser) return;
  
  try {
    const data = await apiCall(`/timetable/student/${currentUser.userId}`, 'GET');
    
    let html = `<h4>Week: ${data.weekId}</h4>`;
    html += `<p>Total Classes: ${data.totalClasses}</p>`;
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    html += '<div class="timetable-grid">';
    days.forEach(day => {
      const dayClasses = data.timetable[day] || [];
      html += `<div class="day-card">
        <h3>${day}</h3>`;
      
      if (dayClasses.length === 0) {
        html += '<p class="no-classes">No classes</p>';
      } else {
        dayClasses.forEach(slot => {
          html += `<div class="class-slot">
            <div class="time">${slot.timeSlot}</div>
            <div class="module">${slot.module}</div>
            <div class="trainer">👨‍🏫 ${slot.trainer}</div>
          </div>`;
        });
      }
      
      html += '</div>';
    });
    html += '</div>';
    
    document.getElementById('timetableOutput').innerHTML = html;
  } catch (error) {
    showOutput('timetableOutput', { error: error.message });
  }
}

// ========== ENHANCED TIMETABLE SUMMARY FUNCTION ==========
// Replace the existing loadTimetableSummary() function with this:

async function loadTimetableSummary() {
  if (!currentUser) return;
  
  try {
    const data = await apiCall(`/timetable/student/${currentUser.userId}/summary`, 'GET');
    
    let html = `
      <div class="summary-container">
        <h3 class="summary-title">📊 Weekly Summary</h3>
        
        <div class="summary-grid">
          <div class="summary-card">
            <div class="summary-number">${data.totalClasses}</div>
            <div class="summary-label">📚 Total Classes</div>
          </div>
          
          <div class="summary-card green">
            <div class="summary-number">${data.daysWithClasses}</div>
            <div class="summary-label">📅 Days with Classes</div>
          </div>
          
          <div class="summary-card red">
            <div class="summary-number">${data.uniqueCourses}</div>
            <div class="summary-label">🎓 Active Courses</div>
          </div>
          
          <div class="summary-card orange">
            <div class="summary-number">${data.uniqueTrainers}</div>
            <div class="summary-label">👨‍🏫 Different Trainers</div>
          </div>
          
          <div class="summary-card blue">
            <div class="summary-number">${data.enrolledCourses}</div>
            <div class="summary-label">📖 Total Enrollments</div>
          </div>
          
          <div class="summary-card purple">
            <div class="summary-number">${7 - data.daysWithClasses}</div>
            <div class="summary-label">🏖️ Free Days</div>
          </div>
        </div>
        
        <div class="info-box">
          <h4>📌 Week Information</h4>
          <p><strong>Week ID:</strong> ${data.weekId}</p>
          <p><strong>Student ID:</strong> ${data.studentId}</p>
        </div>
        
        ${data.totalClasses === 0 ? `
          <div class="notice-box notice-warning">
            <strong>⚠️ Notice:</strong> You have no classes scheduled for this week. Please contact your administrator or check back later.
          </div>
        ` : `
          <div class="notice-box notice-success">
            <strong>✅ All Set!</strong> You have ${data.totalClasses} ${data.totalClasses === 1 ? 'class' : 'classes'} scheduled. Click "Load This Week's Timetable" to see your detailed schedule.
          </div>
        `}
      </div>
    `;
    
    document.getElementById('timetableOutput').innerHTML = html;
  } catch (error) {
    showOutput('timetableOutput', { error: error.message });
  }
}

// ========== INITIALIZATION ==========
window.onload = function() {
  const token = localStorage.getItem('nexanova_token');
  const user = localStorage.getItem('nexanova_user');
  
  if (token && user) {
    currentToken = token;
    currentUser = JSON.parse(user);
    currentUserRole = currentUser.role;
    
    if (currentUserRole === 'admin') {
      showPage('adminPortal');
      loadCoursesForDropdowns();
      updateTrainerStats();
    } else if (currentUserRole === 'student') {
      showPage('studentPortal');
      loadStudentStats();
    }
  }
};