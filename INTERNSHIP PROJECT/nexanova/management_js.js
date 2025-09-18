// App memory store
const appData = {
  trainers: [],
  subjects: []
};

// Initialize with sample data from data.json
appData.trainers = [
  { "name": "Alice", "empId": "T101", "subject": "Math" },
  { "name": "Bob", "empId": "T102", "subject": "Science" }
];
appData.subjects = ["math", "science"];

// Update stats
function updateStats() {
  document.getElementById('trainerCount').textContent = appData.trainers.length;
  document.getElementById('subjectCount').textContent = appData.subjects.length;
}

// Utility function: display output in organized format
function showOutput(data, type = 'info') {
  const outputArea = document.getElementById("outputArea");
  
  if (data.error) {
    outputArea.innerHTML = `<div class="message error">${data.error}</div>`;
    return;
  }
  
  if (data.message && !data.trainers && !data.subjects) {
    outputArea.innerHTML = `<div class="message ${type}">${data.message}</div>`;
    return;
  }

  let html = '';
  
  if (data.message) {
    html += `<div class="message ${type}">${data.message}</div>`;
  }

  // Display trainers in table format
  if (data.trainers || (Array.isArray(data) && data.length > 0 && data[0].empId)) {
    const trainers = data.trainers || data;
    html += `
      <table>
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>🆔 Employee ID</th>
            <th>📚 Subject</th>
          </tr>
        </thead>
        <tbody>
    `;
    trainers.forEach(trainer => {
      html += `
        <tr>
          <td>${trainer.name}</td>
          <td>${trainer.empId}</td>
          <td>${trainer.subject}</td>
        </tr>
      `;
    });
    html += '</tbody></table>';
  }
  
  // Display single trainer
  else if (data.empId) {
    html += `
      <table>
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>🆔 Employee ID</th>
            <th>📚 Subject</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data.name}</td>
            <td>${data.empId}</td>
            <td>${data.subject}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
  
  // Display subjects
  else if (data.subjects || (Array.isArray(data) && typeof data[0] === 'string')) {
    const subjects = data.subjects || data;
    html += `
      <table>
        <thead>
          <tr>
            <th>📚 Subject Name</th>
          </tr>
        </thead>
        <tbody>
    `;
    subjects.forEach((subject, index) => {
      html += `
        <tr>
          <td>${subject}</td>
        </tr>
      `;
    });
    html += '</tbody></table>';
  }
  
  // Display subject with trainers
  else if (data.subject) {
    html += `<h4>📚 Subject: ${data.subject.charAt(0).toUpperCase() + data.subject.slice(1)}</h4>`;
    if (data.trainers && data.trainers.length > 0) {
      html += `
        <table>
          <thead>
            <tr>
              <th>👤 Trainer Name</th>
              <th>🆔 Employee ID</th>
            </tr>
          </thead>
          <tbody>
      `;
      data.trainers.forEach(trainer => {
        html += `
          <tr>
            <td>${trainer.name}</td>
            <td>${trainer.empId}</td>
          </tr>
        `;
      });
      html += '</tbody></table>';
    }
  }

  outputArea.innerHTML = html || '<div class="empty-state"><p>No results found</p></div>';
  updateStats();
}

// Add trainer
function addTrainer() {
  const name = document.getElementById("trainerName").value.trim();
  const empId = document.getElementById("trainerId").value.trim();
  const subject = document.getElementById("trainerSubject").value.trim();

  if (!name || !empId || !subject) {
    showOutput({ error: "⚠️ Please fill all fields." }, 'error');
    return;
  }

  const exists = appData.trainers.find(t => t.empId === empId);
  if (exists) {
    showOutput({ error: "⚠️ Trainer with this Employee ID already exists." }, 'error');
    return;
  }

  appData.trainers.push({ name, empId, subject });
  
  // Add subject to subjects array if not exists
  const subjectLower = subject.toLowerCase();
  if (!appData.subjects.includes(subjectLower)) {
    appData.subjects.push(subjectLower);
  }

  // Clear form
  document.getElementById("trainerName").value = '';
  document.getElementById("trainerId").value = '';
  document.getElementById("trainerSubject").value = '';

  showOutput({ message: "✅ Trainer added successfully!", trainers: appData.trainers }, 'success');
}

// Get all trainers
function getAllTrainers() {
  if (appData.trainers.length === 0) {
    showOutput({ message: "📭 No trainers available." }, 'info');
  } else {
    showOutput(appData.trainers);
  }
}

// Get trainer by ID
function getTrainerById() {
  const id = document.getElementById("getTrainerId").value.trim();
  if (!id) {
    showOutput({ error: "⚠️ Please enter an Employee ID." }, 'error');
    return;
  }

  const trainer = appData.trainers.find(t => t.empId === id);

  if (!trainer) {
    showOutput({ error: "❌ Trainer not found." }, 'error');
  } else {
    showOutput(trainer);
  }
  
  document.getElementById("getTrainerId").value = '';
}

// Get trainers by subject
function getTrainerBySubject() {
  const subject = document.getElementById("getTrainerSubject").value.trim();
  if (!subject) {
    showOutput({ error: "⚠️ Please enter a subject name." }, 'error');
    return;
  }

  const result = appData.trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());

  if (result.length === 0) {
    showOutput({ message: `📭 No trainers found for subject: ${subject}` }, 'info');
  } else {
    showOutput(result);
  }
  
  document.getElementById("getTrainerSubject").value = '';
}

// Delete trainer by ID
function deleteTrainer() {
  const id = document.getElementById("deleteTrainerId").value.trim();
  if (!id) {
    showOutput({ error: "⚠️ Please enter an Employee ID." }, 'error');
    return;
  }

  const index = appData.trainers.findIndex(t => t.empId === id);

  if (index === -1) {
    showOutput({ error: "❌ Trainer not found." }, 'error');
  } else {
    appData.trainers.splice(index, 1);
    showOutput({ message: "🗑️ Trainer deleted successfully!" }, 'success');
  }
  
  document.getElementById("deleteTrainerId").value = '';
}

// Add subject
function addSubject() {
  const name = document.getElementById("subjectName").value.trim();
  if (!name) {
    showOutput({ error: "⚠️ Please enter a subject name." }, 'error');
    return;
  }

  const subjectLower = name.toLowerCase();
  if (appData.subjects.includes(subjectLower)) {
    showOutput({ error: "⚠️ Subject already exists." }, 'error');
    return;
  }

  appData.subjects.push(subjectLower);
  document.getElementById("subjectName").value = '';
  showOutput({ message: "✅ Subject added successfully!", subjects: appData.subjects }, 'success');
}

// Get all subjects
function getAllSubjects() {
  if (appData.subjects.length === 0) {
    showOutput({ message: "📭 No subjects available." }, 'info');
  } else {
    showOutput(appData.subjects);
  }
}

// Get trainers for a subject
function getSubjectDetails() {
  const subject = document.getElementById("subjectId").value.trim();
  if (!subject) {
    showOutput({ error: "⚠️ Please enter a subject name." }, 'error');
    return;
  }

  const subjectLower = subject.toLowerCase();
  const result = appData.trainers.filter(t => t.subject.toLowerCase() === subjectLower);

  if (result.length === 0) {
    showOutput({ message: `📭 No trainers found for subject: ${subject}` }, 'info');
  } else {
    showOutput({ subject: subjectLower, trainers: result });
  }
  
  document.getElementById("subjectId").value = '';
}

// Initialize stats on load
window.addEventListener('DOMContentLoaded', function() {
  updateStats();
});