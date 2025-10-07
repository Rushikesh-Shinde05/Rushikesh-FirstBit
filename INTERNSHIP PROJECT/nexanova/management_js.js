// ============================================
// FIREBASE AUTHENTICATION SETUP
// ============================================

// Check authentication state on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('✅ User logged in:', user.email);
    localStorage.setItem('authToken', user.uid);
    localStorage.setItem('userEmail', user.email);
  } else {
    console.log('❌ No user logged in');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }
});

// ============================================
// PAGE NAVIGATION
// ============================================

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
      showPage('landingPage');
      localStorage.clear();
      console.log('🚪 User signed out successfully');
    }).catch((error) => {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    });
  }
}

// ============================================
// AUTH FORM TOGGLES
// ============================================

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
  clearMessage('adminMessage');
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
  clearMessage('studentMessage');
}

// ============================================
// MESSAGE HELPERS
// ============================================

function showMessage(elementId, message, type) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
  messageEl.style.display = 'block';
}

function clearMessage(elementId) {
  const messageEl = document.getElementById(elementId);
  messageEl.style.display = 'none';
}

// ============================================
// ADMIN AUTHENTICATION
// ============================================

// Admin Login
document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('adminLoginEmail').value;
  const password = document.getElementById('adminLoginPassword').value;
  
  try {
    showMessage('adminMessage', '🔄 Logging in...', 'info');
    
    // Sign in with Firebase
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Verify admin role from MongoDB (you'll need to add this endpoint)
    const response = await fetch(`${API_URL}/auth/verify-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: user.uid, email: user.email })
    });
    
    const data = await response.json();
    
    if (!response.ok || data.role !== 'admin') {
      await auth.signOut();
      throw new Error('Access denied. Admin credentials required.');
    }
    
    showMessage('adminMessage', '✅ Login successful! Loading portal...', 'success');
    
    setTimeout(() => {
      showPage('adminPortal');
      document.getElementById('adminLoginForm').reset();
    }, 1500);
    
  } catch (error) {
    console.error('Admin login error:', error);
    let errorMessage = '❌ Login failed. ';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage += 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Incorrect password.';
          break;
        case 'auth/invalid-credential':
          errorMessage += 'Invalid email or password.';
          break;
        default:
          errorMessage += error.message;
      }
    } else {
      errorMessage += error.message;
    }
    
    showMessage('adminMessage', errorMessage, 'error');
  }
});

// Admin Register
document.getElementById('adminRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('adminRegName').value;
  const email = document.getElementById('adminRegEmail').value;
  const password = document.getElementById('adminRegPassword').value;
  const confirmPassword = document.getElementById('adminRegConfirmPassword').value;
  const accessCode = document.getElementById('adminRegCode').value;
  
  if (password !== confirmPassword) {
    showMessage('adminMessage', '❌ Passwords do not match!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('adminMessage', '❌ Password must be at least 6 characters long.', 'error');
    return;
  }
  
  try {
    showMessage('adminMessage', '🔄 Creating account...', 'info');
    
    // Create user in Firebase
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update display name
    await user.updateProfile({ displayName: name });
    
    // Register in MongoDB
    const response = await fetch(`${API_URL}/auth/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.uid,
        name: name,
        email: email,
        role: 'admin',
        accessCode: accessCode
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      await user.delete();
      throw new Error(data.message || 'Registration failed');
    }
    
    showMessage('adminMessage', '✅ Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleAdminAuth();
      document.getElementById('adminRegisterForm').reset();
    }, 1500);
    
  } catch (error) {
    console.error('Admin registration error:', error);
    let errorMessage = '❌ Registration failed. ';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password is too weak.';
          break;
        default:
          errorMessage += error.message;
      }
    } else {
      errorMessage += error.message;
    }
    
    showMessage('adminMessage', errorMessage, 'error');
  }
});

// ============================================
// STUDENT AUTHENTICATION
// ============================================

// Student Login
document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('studentLoginEmail').value;
  const password = document.getElementById('studentLoginPassword').value;
  
  try {
    showMessage('studentMessage', '🔄 Logging in...', 'info');
    
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Verify student role
    const response = await fetch(`${API_URL}/auth/verify-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: user.uid, email: user.email })
    });
    
    const data = await response.json();
    
    if (!response.ok || data.role !== 'student') {
      await auth.signOut();
      throw new Error('Access denied. Student credentials required.');
    }
    
    showMessage('studentMessage', '✅ Login successful! Welcome ' + data.name, 'success');
    
    setTimeout(() => {
      alert('Welcome ' + data.name + '! Student dashboard coming soon.');
      document.getElementById('studentLoginForm').reset();
    }, 1500);
    
  } catch (error) {
    console.error('Student login error:', error);
    let errorMessage = '❌ Login failed. ';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage += 'Invalid email or password.';
          break;
        default:
          errorMessage += error.message;
      }
    } else {
      errorMessage += error.message;
    }
    
    showMessage('studentMessage', errorMessage, 'error');
  }
});

// Student Register
document.getElementById('studentRegisterForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('studentRegName').value;
  const email = document.getElementById('studentRegEmail').value;
  const roll = document.getElementById('studentRegRoll').value;
  const password = document.getElementById('studentRegPassword').value;
  const confirmPassword = document.getElementById('studentRegConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showMessage('studentMessage', '❌ Passwords do not match!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('studentMessage', '❌ Password must be at least 6 characters long.', 'error');
    return;
  }
  
  try {
    showMessage('studentMessage', '🔄 Creating account...', 'info');
    
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    await user.updateProfile({ displayName: name });
    
    // Register in MongoDB
    const response = await fetch(`${API_URL}/auth/register-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.uid,
        name: name,
        email: email,
        rollNumber: roll,
        role: 'student'
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      await user.delete();
      throw new Error(data.message || 'Registration failed');
    }
    
    showMessage('studentMessage', '✅ Registration successful! Please login.', 'success');
    
    setTimeout(() => {
      toggleStudentAuth();
      document.getElementById('studentRegisterForm').reset();
    }, 1500);
    
  } catch (error) {
    console.error('Student registration error:', error);
    let errorMessage = '❌ Registration failed. ';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'This email is already registered.';
          break;
        default:
          errorMessage += error.message;
      }
    } else {
      errorMessage += error.message;
    }
    
    showMessage('studentMessage', errorMessage, 'error');
  }
});





// (Keep all your existing trainer/subject management functions here)
const API_URL = "http://localhost:5000";

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function showAuth(role) {
  showPage(role === 'admin' ? 'adminAuthPage' : 'studentAuthPage');
}

function logout() {
  if(confirm('Are you sure you want to logout?')) {
    showPage('landingPage');
  }
}

// Toggle Auth Forms
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
}

// Show message helper
function showMessage(elementId, message, type) {
  const messageEl = document.getElementById(elementId);
  messageEl.textContent = message;
  messageEl.className = `message ${type}`;
  messageEl.style.display = 'block';
}

// Auth Handlers
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('adminLoginEmail').value;
  const password = document.getElementById('adminLoginPassword').value;
  
  // Placeholder for Firebase authentication
  console.log('Admin Login:', { email, password });
  showMessage('adminMessage', 'Login successful! Loading portal...', 'success');
  
  setTimeout(() => {
    showPage('adminPortal');
  }, 1500);
});

document.getElementById('adminRegisterForm').addEventListener('submit', function(e) {
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
  
  // Placeholder for Firebase authentication
  console.log('Admin Register:', { name, email, password, accessCode });
  showMessage('adminMessage', 'Registration successful! Please login.', 'success');
  
  setTimeout(() => {
    toggleAdminAuth();
    document.getElementById('adminRegisterForm').reset();
  }, 1500);
});

document.getElementById('studentLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('studentLoginEmail').value;
  const password = document.getElementById('studentLoginPassword').value;
  
  // Placeholder for Firebase authentication
  console.log('Student Login:', { email, password });
  showMessage('studentMessage', 'Login successful!', 'success');
  
  setTimeout(() => {
    alert('Student dashboard coming soon!');
  }, 1500);
});

document.getElementById('studentRegisterForm').addEventListener('submit', function(e) {
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
  
  // Placeholder for Firebase authentication
  console.log('Student Register:', { name, email, roll, password });
  showMessage('studentMessage', 'Registration successful! Please login.', 'success');
  
  setTimeout(() => {
    toggleStudentAuth();
    document.getElementById('studentRegisterForm').reset();
  }, 1500);
});

// Management Functions (Your existing code)
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

//  Add Trainer
async function addTrainer() {
  const name = trainerName.value.trim();
  const empId = trainerId.value.trim();
  const subject = trainerSubject.value.trim();

  if (!name || !empId || !subject) return showOutput({ error: "⚠️ Please fill all fields." });

  const res = await fetch(`${API_URL}/trainers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, empId, subject })
  });

  const data = await res.json();
  showOutput(data);
  trainerName.value = trainerId.value = trainerSubject.value = '';
}

//  Get All Trainers
async function getAllTrainers() {
  const res = await fetch(`${API_URL}/trainers`);
  const trainers = await res.json();
  showOutput(trainers);
}

//