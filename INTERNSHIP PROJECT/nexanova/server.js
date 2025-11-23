//use this directory to connect mongodb (C:\Users\Asus\OneDrive\Desktop\Rushikesh-FirstBit\INTERNSHIP PROJECT\nexanova)
// and the command is (node server.js)

// NexaNova LMS Backend Server
// To run: node server.js
// MongoDB Connection: mongodb://127.0.0.1:27017/nexanovadb

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
mongoose.connect("mongodb://127.0.0.1:27017/nexanovadb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// ========== SCHEMAS ==========

// Trainer Schema
const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empId: { type: String, required: true, unique: true },
  subject: { type: String, required: true }
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);

// Subject Schema (Optional - for future use)
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  trainers: [{ type: String }]
}, { timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);

// ========== TRAINER ROUTES ==========

// ➕ Add Trainer
app.post("/trainers", async (req, res) => {
  try {
    const { name, empId, subject } = req.body;
    
    // Validation
    if (!name || !empId || !subject) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Check if trainer with empId already exists
    const existingTrainer = await Trainer.findOne({ empId });
    if (existingTrainer) {
      return res.status(400).json({ error: "Trainer with this Employee ID already exists" });
    }
    
    const newTrainer = new Trainer({ name, empId, subject });
    await newTrainer.save();
    
    res.json({ message: `✅ Trainer ${name} added successfully!` });
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ error: "Failed to add trainer: " + error.message });
  }
});

// 👥 Get All Trainers
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});

// 🔍 Get Trainer by Employee ID
app.get("/trainers/:empId", async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ empId: req.params.empId });
    
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    
    res.json(trainer);
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({ error: "Failed to fetch trainer" });
  }
});

// 📚 Get Trainers by Subject
app.get("/trainers/subject/:subject", async (req, res) => {
  try {
    const subject = req.params.subject;
    const trainers = await Trainer.find({ 
      subject: { $regex: new RegExp(subject, 'i') } 
    });
    
    if (trainers.length === 0) {
      return res.status(404).json({ error: "No trainers found for this subject" });
    }
    
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers by subject:", error);
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});

// ✏️ Update Trainer
app.put("/trainers/:empId", async (req, res) => {
  try {
    const { name, subject } = req.body;
    const empId = req.params.empId;
    
    const updatedTrainer = await Trainer.findOneAndUpdate(
      { empId },
      { name, subject },
      { new: true }
    );
    
    if (!updatedTrainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    
    res.json({ 
      message: "✅ Trainer updated successfully", 
      trainer: updatedTrainer 
    });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ error: "Failed to update trainer" });
  }
});

// 🗑️ Delete Trainer
app.delete("/trainers/:empId", async (req, res) => {
  try {
    const result = await Trainer.deleteOne({ empId: req.params.empId });
    
    if (result.deletedCount === 0) {
      return res.json({ message: "⚠️ Trainer not found" });
    }
    
    res.json({ message: "✅ Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ error: "Failed to delete trainer" });
  }
});

// ========== SUBJECT ROUTES ==========

// 📋 Get All Unique Subjects
app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Trainer.distinct("subject");
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

// 🔍 Get Subject Details (with trainers)
app.get("/subjects/:name", async (req, res) => {
  try {
    const subjectName = req.params.name;
    const trainers = await Trainer.find({ 
      subject: { $regex: new RegExp(subjectName, 'i') } 
    });
    
    if (trainers.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }
    
    res.json({
      subject: subjectName,
      trainerCount: trainers.length,
      trainers: trainers
    });
  } catch (error) {
    console.error("Error fetching subject details:", error);
    res.status(500).json({ error: "Failed to fetch subject details" });
  }
});

// ========== STATISTICS ROUTE ==========

// 📊 Get Dashboard Statistics
app.get("/stats", async (req, res) => {
  try {
    const totalTrainers = await Trainer.countDocuments();
    const subjects = await Trainer.distinct("subject");
    const totalSubjects = subjects.length;
    
    // Get subject-wise trainer count
    const subjectStats = await Trainer.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    res.json({
      totalTrainers,
      totalSubjects,
      subjectStats
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// ========== HEALTH CHECK ROUTE ==========

app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 NexaNova LMS API is running!", 
    version: "1.0.0",
    endpoints: {
      trainers: "/trainers",
      subjects: "/subjects",
      stats: "/stats"
    }
  });
});

// ========== ERROR HANDLING ==========

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation available at http://localhost:${PORT}`);
});