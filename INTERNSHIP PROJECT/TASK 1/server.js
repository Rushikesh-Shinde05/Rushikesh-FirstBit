const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load initial data from data.json
const DATA_FILE = "data.json";
let db = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

// Save changes back to data.json
function saveDB() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Get all trainers
app.get("/trainers", (req, res) => {
  res.json(db.trainers);
});

// Add trainer
app.post("/trainers", (req, res) => {
  const { name, empId, subject } = req.body;
  if (db.trainers.find(t => t.empId === empId)) {
    return res.status(400).json({ error: "Trainer ID already exists" });
  }
  db.trainers.push({ name, empId, subject });
  saveDB();
  res.json({ message: "Trainer added", trainers: db.trainers });
});

// Get trainer by ID
app.get("/trainers/:id", (req, res) => {
  const trainer = db.trainers.find(t => t.empId === req.params.id);
  trainer ? res.json(trainer) : res.status(404).json({ error: "Not found" });
});

// Delete trainer
app.delete("/trainers/:id", (req, res) => {
  db.trainers = db.trainers.filter(t => t.empId !== req.params.id);
  saveDB();
  res.json({ message: "Trainer deleted", trainers: db.trainers });
});

// Subjects endpoints
app.get("/subjects", (req, res) => {
  res.json(db.subjects);
});

app.post("/subjects", (req, res) => {
  const { id, name, trainers } = req.body;
  db.subjects.push({ id, name, trainers });
  saveDB();
  res.json({ message: "Subject added", subjects: db.subjects });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
