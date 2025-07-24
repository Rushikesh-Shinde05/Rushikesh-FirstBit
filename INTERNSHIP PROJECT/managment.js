const output = document.getElementById("outputArea");

function showOutput(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

async function loadMockData() {
  const response = await fetch("data.json");
  const mockData = await response.json();
  return mockData;
}

// Get all trainers
async function getAllTrainers() {
  const data = await loadMockData();
  showOutput(data.trainers);
}

// Get all subjects
async function getAllSubjects() {
  const data = await loadMockData();
  showOutput(data.subjects);
}

// Other buttons will just show mock responses for now
document.getElementById("addTrainerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("This is a mock form. No trainer actually added.");
});

document.getElementById("deleteTrainerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("Mock: Trainer delete operation simulated.");
});

document.getElementById("getTrainerByIdForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("getTrainerId").value;
  const data = await loadMockData();
  const found = data.trainers.find(t => t.empId === id);
  showOutput(found || { error: "Trainer not found" });
});

document.getElementById("getTrainerBySubjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = document.getElementById("getTrainerSubject").value;
  const data = await loadMockData();
  const result = data.trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());
  showOutput(result.length ? result : { error: "No trainers found for this subject" });
});

document.getElementById("addSubjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("Mock: Subject added successfully (not really).");
});

document.getElementById("getSubjectByIdForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("subjectId").value;
  const data = await loadMockData();
  const found = data.subjects.find(s => s.id === id);
  showOutput(found || { error: "Subject not found" });
});