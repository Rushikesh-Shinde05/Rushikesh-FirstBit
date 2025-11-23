// API Configuration
const API_URL = "http://localhost:5000";

// Current User State
let currentUser = null;
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
    auth.signOut().then(() => {
      currentUser = null;
      currentUserRole = null;
      showPage('landingPage');
      showMessage('adminMessage', 'Logged out successfully!', 'success');
    });
  }
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

// ========== FIREBASE AUTHENTICATION ==========

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('adminLoginEmail').value;
  const password = document.getElementById('adminLoginPassword').value;
  
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Check if user is admin
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists && userDoc.data().role === 'admin') {
      currentUser = user;
      currentUserRole = 'admin';
      showMessage('adminMessage', 'Login successful! Loading portal...', 'success');
      
      setTimeout(() => {
        showPage('adminPortal');
        updateAdminStats();
      }, 1500);
    } else {
      await auth.signOut();
      showMessage('adminMessage', 'Access denied! Admin credentials required.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage('adminMessage', 'Login failed: ' + error.message, 'error');
  }
});

// Admin Registration
document.getElementById('adminRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('adminRegName').value;
  const email = document.getElementById('adminRegEmail').value;
  const password = document.getElementById('adminRegPassword').value;
  const confirmPassword = document.getElementById('adminRegConfirmPassword').value;
  const accessCode = document.getElementById('adminRegCode').value;
  
  if (password !== confirmPassword) {
    showMessage('adminMessage', 'Passwords do not match!', 'error');
    return;
  }
  
  // Verify admin access code
  if (accessCode !== 'ADMIN2024') {
    showMessage('adminMessage', 'Invalid admin access code!', 'error');
    return;
  }
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    await db.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      role: 'admin',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    await user.updateProfile({ displayName: name });
    
    showMessage('adminMessage', 'Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleAdminAuth();
      document.getElementById('adminRegisterForm').reset();
    }, 1500);
  } catch (error) {
    console.error('Registration error:', error);
    showMessage('adminMessage', 'Registration failed: ' + error.message, 'error');
  }
});

// Student Login
document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('studentLoginEmail').value;
  const password = document.getElementById('studentLoginPassword').value;
  
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Check if user is student
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (userDoc.exists && userDoc.data().role === 'student') {
      currentUser = user;
      currentUserRole = 'student';
      const userData = userDoc.data();
      
      showMessage('studentMessage', 'Login successful! Loading portal...', 'success');
      
      setTimeout(() => {
        document.getElementById('studentWelcome').textContent = `Welcome back, ${userData.name}!`;
        showPage('studentPortal');
        updateStudentStats();
      }, 1500);
    } else {
      await auth.signOut();
      showMessage('studentMessage', 'Access denied! Student credentials required.', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage('studentMessage', 'Login failed: ' + error.message, 'error');
  }
});

// Student Registration
document.getElementById('studentRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('studentRegName').value;
  const email = document.getElementById('studentRegEmail').value;
  const roll = document.getElementById('studentRegRoll').value;
  const password = document.getElementById('studentRegPassword').value;
  const confirmPassword = document.getElementById('studentRegConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showMessage('studentMessage', 'Passwords do not match!', 'error');
    return;
  }
  
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    await db.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      rollNumber: roll,
      role: 'student',
      enrollments: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    await user.updateProfile({ displayName: name });
    
    showMessage('studentMessage', 'Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleStudentAuth();
      document.getElementById('studentRegisterForm').reset();
    }, 1500);
  } catch (error) {
    console.error('Registration error:', error);
    showMessage('studentMessage', 'Registration failed: ' + error.message, 'error');
  }
});

// ========== ADMIN PORTAL FUNCTIONS ==========

function showOutput(data, type = 'info') {
  const outputArea = document.getElementById("outputArea");
  
  if (data.error) {
    outputArea.innerHTML = `<div class="message error">${data.error}</div>`;
    return;
  }

  let html = '';
  if (data.message && !data.trainers && !data.subjects)
    html += `<div class="message ${type}">${data.message}</div>`;

  if (Array.isArray(data) && data.length && data[0].empId) {
    html += `
      <table>
        <thead><tr><th>👤 Name</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead>
        <tbody>${data.map(t => `<tr><td>${t.name}</td><td>${t.empId}</td><td>${t.subject}</td></tr>`).join('')}</tbody>
      </table>`;
  } else if (data.empId) {
    html += `<table><thead><tr><th>👤 Name</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead>
      <tbody><tr><td>${data.name}</td><td>${data.empId}</td><td>${data.subject}</td></tr></tbody></table>`;
  } else if (data.subject) {
    html += `<h4>📚 Subject: ${data.subject}</h4>`;
    html += `<table><thead><tr><th>👤 Trainer</th><th>🆔 Employee ID</th></tr></thead><tbody>`;
    data.trainers.forEach(t => html += `<tr><td>${t.name}</td><td>${t.empId}</td></tr>`);
    html += `</tbody></table>`;
  } else if (Array.isArray(data) && typeof data[0] === 'string') {
    html += `<table><thead><tr><th>📚 Subject Name</th></tr></thead>
      <tbody>${data.map(s => `<tr><td>${s}</td></tr>`).join('')}</tbody></table>`;
  }

  outputArea.innerHTML = html || '<div class="empty-state"><p>No results found</p></div>';
}

async function updateAdminStats() {
  try {
    const trainers = await fetch(`${API_URL}/trainers`).then(res => res.json());
    document.getElementById('trainerCount').textContent = trainers.length || 0;
    
    // Get unique subjects
    const subjects = [...new Set(trainers.map(t => t.subject))];
    document.getElementById('subjectCount').textContent = subjects.length || 0;
  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

async function addTrainer() {
  const name = document.getElementById('trainerName').value.trim();
  const empId = document.getElementById('trainerId').value.trim();
  const subject = document.getElementById('trainerSubject').value.trim();

  if (!name || !empId || !subject) {
    showOutput({ error: "⚠️ Please fill all fields." });
    return;
  }

  try {
    const res = await fetch(`${API_URL}/trainers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, empId, subject })
    });

    const data = await res.json();
    showOutput(data, 'success');
    
    document.getElementById('trainerName').value = '';
    document.getElementById('trainerId').value = '';
    document.getElementById('trainerSubject').value = '';
    
    updateAdminStats();
  } catch (error) {
    showOutput({ error: "Failed to add trainer: " + error.message });
  }
}

async function getAllTrainers() {
  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    showOutput(trainers);
  } catch (error) {
    showOutput({ error: "Failed to fetch trainers: " + error.message });
  }
}

async function getTrainerById() {
  const empId = document.getElementById('getTrainerId').value.trim();
  
  if (!empId) {
    showOutput({ error: "⚠️ Please enter an Employee ID." });
    return;
  }

  try {
    const res = await fetch(`${API_URL}/trainers/${empId}`);
    const trainer = await res.json();
    showOutput(trainer);
  } catch (error) {
    showOutput({ error: "Failed to fetch trainer: " + error.message });
  }
}

async function getTrainerBySubject() {
  const subject = document.getElementById('getTrainerSubject').value.trim();
  
  if (!subject) {
    showOutput({ error: "⚠️ Please enter a subject name." });
    return;
  }

  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const filtered = trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
    
    if (filtered.length === 0) {
      showOutput({ error: "No trainers found for this subject." });
    } else {
      showOutput(filtered);
    }
  } catch (error) {
    showOutput({ error: "Failed to filter trainers: " + error.message });
  }
}

async function deleteTrainer() {
  const empId = document.getElementById('deleteTrainerId').value.trim();
  
  if (!empId) {
    showOutput({ error: "⚠️ Please enter an Employee ID to delete." });
    return;
  }

  if (!confirm(`Are you sure you want to delete trainer with ID: ${empId}?`)) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/trainers/${empId}`, {
      method: "DELETE"
    });

    const data = await res.json();
    showOutput(data, data.message.includes('deleted') ? 'success' : 'error');
    
    document.getElementById('deleteTrainerId').value = '';
    updateAdminStats();
  } catch (error) {
    showOutput({ error: "Failed to delete trainer: " + error.message });
  }
}

async function addSubject() {
  const subjectName = document.getElementById('subjectName').value.trim();

  if (!subjectName) {
    showOutput({ error: "⚠️ Please enter a subject name." });
    return;
  }

  showOutput({ message: `Subject "${subjectName}" added successfully!` }, 'success');
  document.getElementById('subjectName').value = '';
  updateAdminStats();
}

async function getAllSubjects() {
  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const subjects = [...new Set(trainers.map(t => t.subject))];
    
    if (subjects.length === 0) {
      showOutput({ error: "No subjects found." });
    } else {
      showOutput(subjects);
    }
  } catch (error) {
    showOutput({ error: "Failed to fetch subjects: " + error.message });
  }
}

async function getSubjectDetails() {
  const subject = document.getElementById('subjectId').value.trim();
  
  if (!subject) {
    showOutput({ error: "⚠️ Please enter a subject name." });
    return;
  }

  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const filtered = trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
    
    if (filtered.length === 0) {
      showOutput({ error: "Subject not found or no trainers assigned." });
    } else {
      showOutput({ subject: subject, trainers: filtered });
    }
  } catch (error) {
    showOutput({ error: "Failed to fetch subject details: " + error.message });
  }
}

// ========== STUDENT PORTAL FUNCTIONS ==========

function showStudentOutput(data, type = 'info') {
  const outputArea = document.getElementById("studentOutputArea");
  
  if (data.error) {
    outputArea.innerHTML = `<div class="message error">${data.error}</div>`;
    return;
  }

  let html = '';
  if (data.message) {
    html += `<div class="message ${type}">${data.message}</div>`;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      html += '<div class="empty-state"><p>No data available</p></div>';
    } else if (data[0].subject) {
      // Display subjects
      html += `
        <table>
          <thead><tr><th>📚 Subject</th><th>👤 Trainers</th><th>Action</th></tr></thead>
          <tbody>${data.map(s => `
            <tr>
              <td>${s.subject}</td>
              <td>${s.trainerCount}</td>
              <td><button class="btn-info action-btn" onclick="enrollInSubjectDirect('${s.subject}')">Enroll</button></td>
            </tr>
          `).join('')}</tbody>
        </table>`;
    } else if (data[0].name && data[0].empId) {
      // Display trainers
      html += `
        <table>
          <thead><tr><th>👤 Trainer</th><th>🆔 Employee ID</th><th>📚 Subject</th></tr></thead>
          <tbody>${data.map(t => `
            <tr>
              <td>${t.name}</td>
              <td>${t.empId}</td>
              <td>${t.subject}</td>
            </tr>
          `).join('')}</tbody>
        </table>`;
    }
  } else if (data.enrollments) {
    // Display enrollments
    if (data.enrollments.length === 0) {
      html += '<div class="empty-state"><p>You are not enrolled in any courses yet.</p></div>';
    } else {
      html += `
        <table>
          <thead><tr><th>📚 Enrolled Subjects</th><th>📅 Enrolled On</th></tr></thead>
          <tbody>${data.enrollments.map(e => `
            <tr>
              <td>${e}</td>
              <td>Recently</td>
            </tr>
          `).join('')}</tbody>
        </table>`;
    }
  }

  outputArea.innerHTML = html;
}

async function updateStudentStats() {
  if (!currentUser) return;
  
  try {
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const enrollments = userDoc.data().enrollments || [];
    
    document.getElementById('enrolledCount').textContent = enrollments.length;
    
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const subjects = [...new Set(trainers.map(t => t.subject))];
    
    document.getElementById('availableCount').textContent = subjects.length;
  } catch (error) {
    console.error('Error updating student stats:', error);
  }
}

async function loadAvailableSubjects() {
  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    
    const subjectMap = {};
    trainers.forEach(t => {
      if (!subjectMap[t.subject]) {
        subjectMap[t.subject] = 0;
      }
      subjectMap[t.subject]++;
    });
    
    const subjects = Object.keys(subjectMap).map(subject => ({
      subject: subject,
      trainerCount: subjectMap[subject]
    }));
    
    showStudentOutput(subjects);
  } catch (error) {
    showStudentOutput({ error: "Failed to load subjects: " + error.message });
  }
}

async function loadMyEnrollments() {
  if (!currentUser) {
    showStudentOutput({ error: "Please login first." });
    return;
  }
  
  try {
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const enrollments = userDoc.data().enrollments || [];
    
    showStudentOutput({ enrollments: enrollments });
  } catch (error) {
    showStudentOutput({ error: "Failed to load enrollments: " + error.message });
  }
}

async function enrollInSubject() {
  const subjectName = document.getElementById('enrollSubjectName').value.trim();
  await enrollInSubjectDirect(subjectName);
}

async function enrollInSubjectDirect(subjectName) {
  if (!currentUser) {
    showStudentOutput({ error: "Please login first." });
    return;
  }
  
  if (!subjectName) {
    showStudentOutput({ error: "⚠️ Please enter a subject name." });
    return;
  }
  
  try {
    // Check if subject exists
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const subjectExists = trainers.some(t => t.subject.toLowerCase() === subjectName.toLowerCase());
    
    if (!subjectExists) {
      showStudentOutput({ error: "Subject not found. Please check the subject name." });
      return;
    }
    
    // Get current enrollments
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const enrollments = userDoc.data().enrollments || [];
    
    // Check if already enrolled
    if (enrollments.some(e => e.toLowerCase() === subjectName.toLowerCase())) {
      showStudentOutput({ error: "You are already enrolled in this subject." });
      return;
    }
    
    // Add enrollment
    enrollments.push(subjectName);
    await db.collection('users').doc(currentUser.uid).update({
      enrollments: enrollments
    });
    
    showStudentOutput({ message: `Successfully enrolled in ${subjectName}!` }, 'success');
    document.getElementById('enrollSubjectName').value = '';
    updateStudentStats();
  } catch (error) {
    showStudentOutput({ error: "Enrollment failed: " + error.message });
  }
}

async function viewTrainersBySubject() {
  const subject = document.getElementById('searchSubject').value.trim();
  
  if (!subject) {
    showStudentOutput({ error: "⚠️ Please enter a subject name." });
    return;
  }
  
  try {
    const res = await fetch(`${API_URL}/trainers`);
    const trainers = await res.json();
    const filtered = trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
    
    if (filtered.length === 0) {
      showStudentOutput({ error: "No trainers found for this subject." });
    } else {
      showStudentOutput(filtered);
    }
  } catch (error) {
    showStudentOutput({ error: "Failed to search trainers: " + error.message });
  }
}

// ========== INITIALIZATION ==========
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    console.log('User authenticated:', user.email);
  } else {
    currentUser = null;
    currentUserRole = null;
  }
});