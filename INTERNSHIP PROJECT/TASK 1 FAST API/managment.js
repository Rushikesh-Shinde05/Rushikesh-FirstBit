const output = document.getElementById("outputArea");
const API_BASE = "http://127.0.0.1:8000";

function showOutput(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

// 🔹 Get all trainers
async function getAllTrainers() {
  const response = await fetch(`${API_BASE}/trainer`);
  const data = await response.json();
  showOutput(data);
}

// 🔹 Get all subjects
async function getAllSubjects() {
  const response = await fetch(`${API_BASE}/subject`);
  const data = await response.json();
  showOutput(data);
}

// 🔹 Add new trainer
document.getElementById("addTrainerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("trainerName").value;
  const empId = document.getElementById("trainerId").value;
  const subject = document.getElementById("trainerSubject").value;

  const response = await fetch(`${API_BASE}/trainer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, empId, subject }),
  });

  const result = await response.json();
  showOutput(result);
});

// 🔹 Delete trainer
document.getElementById("deleteTrainerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empId = document.getElementById("deleteTrainerId").value;

  const response = await fetch(`${API_BASE}/trainer?empId=${empId}`, {
    method: "DELETE",
  });

  const result = await response.json();
  showOutput(result);
});

// 🔹 Get trainer by ID (empId)
document.getElementById("getTrainerByIdForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const empId = document.getElementById("getTrainerId").value;

  const response = await fetch(`${API_BASE}/trainer/${empId}`);
  const result = await response.json();
  showOutput(result);
});

// 🔹 Get trainers by subject
document.getElementById("getTrainerBySubjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = document.getElementById("getTrainerSubject").value;

  const response = await fetch(`${API_BASE}/trainer/${subject}/topic`);
  const result = await response.json();
  showOutput(result);
});

// 🔹 Add subject
document.getElementById("addSubjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("subjectName").value;

  const response = await fetch(`${API_BASE}/subject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const result = await response.json();
  showOutput(result);
});

// 🔹 Get subject by ID
document.getElementById("getSubjectByIdForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("subjectId").value;

  const response = await fetch(`${API_BASE}/subject/${id}`);
  const result = await response.json();
  showOutput(result);
});
