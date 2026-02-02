// Data Storage System
let currentUser = null;
let currentReport = [];

// Initialize default data
function initializeData() {
    if (!localStorage.getItem('mockEvalData')) {
        const defaultData = {
            users: [
                {
                    id: 'user1',
                    name: 'Admin User',
                    email: 'admin@test.com',
                    password: 'admin123',
                    role: 'admin'
                },
                {
                    id: 'user2',
                    name: 'John Evaluator',
                    email: 'evaluator@test.com',
                    password: 'eval123',
                    role: 'evaluator'
                }
            ],
            batches: [],
            technologies: [],
            participants: [],
            evaluations: [],
            evalConfigs: [],
             evalConfigs: []
        };
        localStorage.setItem('mockEvalData', JSON.stringify(defaultData));
    }
}

// Helper functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getAllData() {
    const data = localStorage.getItem('mockEvalData');
    return data ? JSON.parse(data) : null;
}

function saveAllData(data) {
    localStorage.setItem('mockEvalData', JSON.stringify(data));
}

function getData(key) {
    const allData = getAllData();
    return allData ? allData[key] : [];
}

function saveData(key, value) {
    const allData = getAllData();
    allData[key] = value;
    saveAllData(allData);
}

function showMessage(elementId, message, type) {
    const el = document.getElementById(elementId);
    el.innerHTML = `<div class="message ${type}">${message}</div>`;
    setTimeout(() => el.innerHTML = '', 3000);
}

// Initialize app
initializeData();

// Check if user is logged in
const loggedInUser = sessionStorage.getItem('currentUser');
if (loggedInUser) {
    currentUser = JSON.parse(loggedInUser);
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    loadDashboard();
}

// Login Form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = getData('users');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        loadDashboard();
    } else {
        showMessage('loginMessage', 'Invalid email or password', 'error');
    }
});

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    location.reload();
}

// Load Dashboard
function loadDashboard() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.role.toUpperCase();

    if (currentUser.role === 'admin') {
        document.getElementById('adminDashboard').classList.remove('hidden');
        loadAdminDashboard();
    } else {
        document.getElementById('evaluatorDashboard').classList.remove('hidden');
        loadEvaluatorDashboard();
    }
}

// Show Tab
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.remove('hidden');

    switch(tabName) {
        case 'dashboard': loadAdminDashboard(); break;
        case 'batches': loadBatches(); break;
        case 'technologies': loadTechnologies(); break;
        case 'participants': loadParticipants(); break;
        case 'users': loadUsers(); break;
        case 'reports': loadReportData(); break;
    }
}

// Admin Dashboard
function loadAdminDashboard() {
    const batches = getData('batches');
    const techs = getData('technologies');
    const participants = getData('participants');

    document.getElementById('totalBatches').textContent = batches.length;
    document.getElementById('totalTechnologies').textContent = techs.length;
    document.getElementById('totalParticipants').textContent = participants.length;
}

// Batch Management
document.getElementById('batchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const batches = getData('batches');
    const newBatch = {
        id: generateId(),
        name: document.getElementById('batchName').value,
        startDate: document.getElementById('batchStart').value,
        endDate: document.getElementById('batchEnd').value
    };

    if (batches.find(b => b.name === newBatch.name)) {
        showMessage('batchMessage', 'Batch name already exists', 'error');
        return;
    }

    batches.push(newBatch);
    saveData('batches', batches);
    showMessage('batchMessage', 'Batch created successfully!', 'success');
    e.target.reset();
    loadBatches();
    loadAdminDashboard();
});

function loadBatches() {
    const batches = getData('batches');
    const tbody = document.querySelector('#batchesTable tbody');
    
    if (batches.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No batches created yet</td></tr>';
    } else {
        tbody.innerHTML = batches.map(b => `
            <tr>
                <td>${b.name}</td>
                <td>${new Date(b.startDate).toLocaleDateString()}</td>
                <td>${new Date(b.endDate).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteBatch('${b.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    updateBatchDropdowns();
}

function updateBatchDropdowns() {
    const batches = getData('batches');
    const selects = ['participantBatch', 'reportBatch'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = '<option value="">Select Batch</option>' +
            batches.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
    });
}

function deleteBatch(id) {
    if (confirm('Are you sure you want to delete this batch?')) {
        let batches = getData('batches');
        batches = batches.filter(b => b.id !== id);
        saveData('batches', batches);
        loadBatches();
        loadAdminDashboard();
    }
}

// Technology Management
document.getElementById('techForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const technologies = getData('technologies');
    const newTech = {
        id: generateId(),
        name: document.getElementById('techName').value
    };

    if (technologies.find(t => t.name === newTech.name)) {
        showMessage('techMessage', 'Technology already exists', 'error');
        return;
    }

    technologies.push(newTech);
    saveData('technologies', technologies);
    showMessage('techMessage', 'Technology added successfully!', 'success');
    e.target.reset();
    loadTechnologies();
    loadAdminDashboard();
});

document.getElementById('configForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const configs = getData('evalConfigs');
    const techId = document.getElementById('configTech').value;
    const rounds = document.getElementById('configRounds').value;

    const filteredConfigs = configs.filter(c => c.technologyId !== techId);
    filteredConfigs.push({
        id: generateId(),
        technologyId: techId,
        rounds: parseInt(rounds)
    });

    saveData('evalConfigs', filteredConfigs);
    showMessage('configMessage', 'Configuration saved successfully!', 'success');
    e.target.reset();
    loadTechnologies();
});

function loadTechnologies() {
    const technologies = getData('technologies');
    const configs = getData('evalConfigs');
    const tbody = document.querySelector('#techTable tbody');

    if (technologies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="empty-state">No technologies added yet</td></tr>';
    } else {
        tbody.innerHTML = technologies.map(t => {
            const config = configs.find(c => c.technologyId === t.id);
            return `
                <tr>
                    <td>${t.name}</td>
                    <td>${config ? config.rounds + ' rounds' : 'Not configured'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteTechnology('${t.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateTechnologyDropdowns();
}

function updateTechnologyDropdowns() {
    const technologies = getData('technologies');
    const selects = ['configTech', 'participantTech', 'reportTech'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = '<option value="">Select Technology</option>' +
            technologies.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    });
}

function deleteTechnology(id) {
    if (confirm('Are you sure you want to delete this technology?')) {
        let technologies = getData('technologies');
        technologies = technologies.filter(t => t.id !== id);
        saveData('technologies', technologies);
        loadTechnologies();
        loadAdminDashboard();
    }
}

// Participant Management
document.getElementById('participantForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const participants = getData('participants');
    const newParticipant = {
        id: generateId(),
        name: document.getElementById('participantName').value,
        email: document.getElementById('participantEmail').value,
        batchId: document.getElementById('participantBatch').value,
        technologyId: document.getElementById('participantTech').value
    };

    if (participants.find(p => p.email === newParticipant.email)) {
        showMessage('participantMessage', 'Participant email already exists', 'error');
        return;
    }

    participants.push(newParticipant);
    saveData('participants', participants);
    showMessage('participantMessage', 'Participant added successfully!', 'success');
    e.target.reset();
    loadParticipants();
    loadAdminDashboard();
});

function loadParticipants() {
    const participants = getData('participants');
    const batches = getData('batches');
    const technologies = getData('technologies');
    const tbody = document.querySelector('#participantsTable tbody');

    if (participants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No participants added yet</td></tr>';
    } else {
        tbody.innerHTML = participants.map(p => {
            const batch = batches.find(b => b.id === p.batchId);
            const tech = technologies.find(t => t.id === p.technologyId);
            return `
                <tr>
                    <td>${p.name}</td>
                    <td>${p.email}</td>
                    <td>${batch ? batch.name : 'N/A'}</td>
                    <td>${tech ? tech.name : 'N/A'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteParticipant('${p.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function deleteParticipant(id) {
    if (confirm('Are you sure you want to delete this participant?')) {
        let participants = getData('participants');
        participants = participants.filter(p => p.id !== id);
        saveData('participants', participants);
        loadParticipants();
        loadAdminDashboard();
    }
}

// User Management
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const users = getData('users');
    const newUser = {
        id: generateId(),
        name: document.getElementById('userFullName').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value,
        role: document.getElementById('userRole').value
    };

    if (users.find(u => u.email === newUser.email)) {
        showMessage('userMessage', 'User email already exists', 'error');
        return;
    }

    users.push(newUser);
    saveData('users', users);
    showMessage('userMessage', 'User created successfully!', 'success');
    e.target.reset();
    loadUsers();
});

function loadUsers() {
    const users = getData('users');
    const tbody = document.querySelector('#usersTable tbody');

    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
                ${(u.email !== 'admin@test.com' && u.email !== 'evaluator@test.com') ? 
                    `<button class="btn btn-danger" onclick="deleteUser('${u.id}')">Delete</button>` : 
                    '<span style="color: #999;">Default User</span>'}
            </td>
        </tr>
    `).join('');
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = getData('users');
        users = users.filter(u => u.id !== id);
        saveData('users', users);
        loadUsers();
    }
}

// Reports
function loadReportData() {
    updateBatchDropdowns();
    updateTechnologyDropdowns();
}

function generateReport() {
    const batchId = document.getElementById('reportBatch').value;
    const techId = document.getElementById('reportTech').value;

    if (!batchId || !techId) {
        alert('Please select both batch and technology');
        return;
    }

    const participants = getData('participants');
    const evaluations = getData('evaluations');
    const batches = getData('batches');
    const technologies = getData('technologies');
    const users = getData('users');

    const batch = batches.find(b => b.id === batchId);
    const tech = technologies.find(t => t.id === techId);

    const filteredParticipants = participants.filter(p => 
        p.batchId === batchId && p.technologyId === techId
    );

    const resultsDiv = document.getElementById('reportResults');

    if (filteredParticipants.length === 0) {
        resultsDiv.innerHTML = '<p class="empty-state">No participants found for this selection.</p>';
        currentReport = [];
        return;
    }

    let html = `<h3 style="margin-bottom: 15px;">Report: ${batch.name} - ${tech.name}</h3>`;
    html += '<table><thead><tr><th>Participant</th><th>Round</th><th>Score</th><th>Evaluator</th><th>Comments</th><th>Date</th></tr></thead><tbody>';

    const reportData = [];

    filteredParticipants.forEach(p => {
        const participantEvals = evaluations.filter(e => 
            e.participantId === p.id && e.technologyId === techId
        );

        if (participantEvals.length === 0) {
            html += `<tr><td>${p.name}</td><td colspan="5">No evaluations yet</td></tr>`;
            reportData.push({
                participant: p.name,
                email: p.email,
                round: 'N/A',
                score: 'N/A',
                evaluator: 'N/A',
                comments: 'No evaluations',
                date: 'N/A'
            });
        } else {
            participantEvals.forEach(e => {
                const evaluator = users.find(u => u.id === e.evaluatorId);
                const date = new Date(e.submittedAt).toLocaleDateString();
                html += `
                    <tr>
                        <td>${p.name}</td>
                        <td>Round ${e.round}</td>
                        <td>${e.score}</td>
                        <td>${evaluator ? evaluator.name : 'Unknown'}</td>
                        <td>${e.comments}</td>
                        <td>${date}</td>
                    </tr>
                `;
                reportData.push({
                    participant: p.name,
                    email: p.email,
                    round: e.round,
                    score: e.score,
                    evaluator: evaluator ? evaluator.name : 'Unknown',
                    comments: e.comments,
                    date: date
                });
            });
        }
    });

    html += '</tbody></table>';
    resultsDiv.innerHTML = html;
    currentReport = reportData;
}

function exportReportCSV() {
    if (currentReport.length === 0) {
        alert('Please generate a report first');
        return;
    }

    const headers = ['Participant', 'Email', 'Round', 'Score', 'Evaluator', 'Comments', 'Date'];
    const csvContent = [
        headers.join(','),
        ...currentReport.map(row => 
            [row.participant, row.email, row.round, row.score, row.evaluator, 
             `"${row.comments}"`, row.date].join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation_report_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Evaluator Dashboard
function loadEvaluatorDashboard() {
    const participants = getData('participants');
    const batches = getData('batches');
    const technologies = getData('technologies');
    const tbody = document.querySelector('#assignedTable tbody');

    if (participants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No participants assigned yet</td></tr>';
    } else {
        tbody.innerHTML = participants.map(p => {
            const batch = batches.find(b => b.id === p.batchId);
            const tech = technologies.find(t => t.id === p.technologyId);
            return `
                <tr>
                    <td>${p.name}</td>
                    <td>${p.email}</td>
                    <td>${batch ? batch.name : 'N/A'}</td>
                    <td>${tech ? tech.name : 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary" onclick="openEvalForm('${p.id}', '${p.name}', '${p.technologyId}')">
                            Evaluate
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    loadEvaluatorHistory();
}

function openEvalForm(participantId, participantName, techId) {
    document.getElementById('evaluationForm').classList.remove('hidden');
    document.getElementById('evalParticipantId').value = participantId;
    document.getElementById('evalParticipantName').value = participantName;
    document.getElementById('evalTechId').value = techId;
    document.getElementById('evaluationForm').scrollIntoView({ behavior: 'smooth' });
}

function closeEvalForm() {
    document.getElementById('evaluationForm').classList.add('hidden');
    document.getElementById('evaluationSubmitForm').reset();
}

document.getElementById('evaluationSubmitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const evaluations = getData('evaluations');
    const newEvaluation = {
        id: generateId(),
        participantId: document.getElementById('evalParticipantId').value,
        evaluatorId: currentUser.id,
        technologyId: document.getElementById('evalTechId').value,
        round: parseInt(document.getElementById('evalRound').value),
        score: parseInt(document.getElementById('evalScore').value),
        comments: document.getElementById('evalComments').value,
        submittedAt: new Date().toISOString()
    };

    evaluations.push(newEvaluation);
    saveData('evaluations', evaluations);
    showMessage('evalMessage', 'Evaluation submitted successfully!', 'success');
    
    setTimeout(() => {
        closeEvalForm();
        loadEvaluatorHistory();
    }, 1500);
});

function loadEvaluatorHistory() {
    const evaluations = getData('evaluations');
    const participants = getData('participants');
    const technologies = getData('technologies');
    const tbody = document.querySelector('#evalHistoryTable tbody');

    const myEvaluations = evaluations.filter(e => e.evaluatorId === currentUser.id);

    if (myEvaluations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No evaluations submitted yet</td></tr>';
    } else {
        tbody.innerHTML = myEvaluations.map(e => {
            const participant = participants.find(p => p.id === e.participantId);
            const tech = technologies.find(t => t.id === e.technologyId);
            return `
                <tr>
                    <td>${participant ? participant.name : 'Unknown'}</td>
                    <td>${tech ? tech.name : 'Unknown'}</td>
                    <td>Round ${e.round}</td>
                    <td>${e.score}</td>
                    <td>${new Date(e.submittedAt).toLocaleDateString()}</td>
                </tr>
            `;
        }).join('');
    }
}