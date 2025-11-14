//use this directory to connect mongodb (C:\Users\Asus\OneDrive\Desktop\Rushikesh-FirstBit\INTERNSHIP PROJECT\nexanova)
// and the command is (node server.js)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/nexanovadb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Trainer Schema
const trainerSchema = new mongoose.Schema({
  name: String,
  empId: String,
  subject: String
});
const Trainer = mongoose.model("Trainer", trainerSchema);

// Routes

// ➕ Add Trainer
app.post("/trainers", async (req, res) => {
  try {
    const { name, empId, subject } = req.body;
    const newTrainer = new Trainer({ name, empId, subject });
    await newTrainer.save();
    res.json({ message: "Trainer added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add trainer" });
  }
});

// 👥 Get All Trainers
app.get("/trainers", async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
});

// 🔍 Get Trainer by ID
app.get("/trainers/:empId", async (req, res) => {
  const trainer = await Trainer.findOne({ empId: req.params.empId });
  trainer ? res.json(trainer) : res.status(404).json({ error: "Trainer not found" });
});

// 🗑️ Delete Trainer
app.delete("/trainers/:empId", async (req, res) => {
  const result = await Trainer.deleteOne({ empId: req.params.empId });
  res.json({ message: result.deletedCount ? "Trainer deleted" : "Trainer not found" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
