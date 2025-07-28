// App memory store
const appData = {
  trainers: [],
  subjects: []
};

// Utility function: display output in <pre>
function showOutput(data) {
  document.getElementById("outputArea").textContent = JSON.stringify(data, null, 2);
}

// Add trainer
function addTrainer() {
  const name = document.getElementById("trainerName").value.trim();
  const empId = document.getElementById("trainerId").value.trim();
  const subject = document.getElementById("trainerSubject").value.trim();

  if (!name || !empId || !subject) {
    alert("Please fill all fields.");
    return;
  }

  const exists = appData.trainers.find(t => t.empId === empId);
  if (exists) {
    alert("Trainer with this ID already exists.");
    return;
  }

  appData.trainers.push({ name, empId, subject });
  showOutput({ message: "Trainer added successfully", trainers: appData.trainers });
}

// Get all trainers
function getAllTrainers() {
  if (appData.trainers.length === 0) {
    showOutput({ message: "No trainers available." });
  } else {
    showOutput(appData.trainers);
  }
}

// Get trainer by ID
function getTrainerById() {
  const id = document.getElementById("getTrainerId").value.trim();
  const trainer = appData.trainers.find(t => t.empId === id);

  if (!trainer) {
    showOutput({ error: "Trainer not found." });
  } else {
    showOutput(trainer);
  }
}

// Get trainers by subject
function getTrainerBySubject() {
  const subject = document.getElementById("getTrainerSubject").value.trim();
  const result = appData.trainers.filter(t => t.subject.toLowerCase() === subject.toLowerCase());

  if (result.length === 0) {
    showOutput({ message: "No trainers found for this subject." });
  } else {
    showOutput(result);
  }
}

// Delete trainer by ID
function deleteTrainer() {
  const id = document.getElementById("deleteTrainerId").value.trim();
  const index = appData.trainers.findIndex(t => t.empId === id);

  if (index === -1) {
    showOutput({ error: "Trainer not found." });
  } else {
    appData.trainers.splice(index, 1);
    showOutput({ message: "Trainer deleted successfully", trainers: appData.trainers });
  }
}

// Add subject
function addSubject() {
  const name = document.getElementById("subjectName").value.trim();
  if (!name) {
    alert("Please enter a subject name.");
    return;
  }

  if (appData.subjects.includes(name.toLowerCase())) {
    alert("Subject already exists.");
    return;
  }

  appData.subjects.push(name.toLowerCase());
  showOutput({ message: "Subject added", subjects: appData.subjects });
}

// Get all subjects
function getAllSubjects() {
  if (appData.subjects.length === 0) {
    showOutput({ message: "No subjects available." });
  } else {
    showOutput(appData.subjects);
  }
}

// Get trainers for a subject
function getSubjectDetails() {
  const subject = document.getElementById("subjectId").value.trim().toLowerCase();
  const result = appData.trainers.filter(t => t.subject.toLowerCase() === subject);

  if (result.length === 0) {
    showOutput({ message: "No trainers found for this subject." });
  } else {
    showOutput({ subject: subject, trainers: result });
  }
}
