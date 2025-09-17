// Add trainer via backend
function addTrainer() {
  const name = document.getElementById("trainerName").value.trim();
  const empId = document.getElementById("trainerId").value.trim();
  const subject = document.getElementById("trainerSubject").value.trim();

  fetch("http://localhost:5000/trainers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, empId, subject })
  })
    .then(res => res.json())
    .then(data => showOutput(data));
}

// Get all trainers
function getAllTrainers() {
  fetch("http://localhost:5000/trainers")
    .then(res => res.json())
    .then(data => showOutput(data));
}
