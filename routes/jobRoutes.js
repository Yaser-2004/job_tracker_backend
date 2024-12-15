import express from 'express'
const router = express.Router();
import Job from '../models/Job.js'
import authenticateToken from '../middlewares/authMiddleware.js';

// Add a new job application 
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("request.body --->",req.body);
    
    const { title, company, status, dateApplied, notes } = req.body;
    
    const newJob = new Job({ title, company, status, dateApplied, notes, user: req.user.id });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error adding job application", error });
  }
});

// Fetch all job applications 
router.get("/", authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find({user: req.user.id});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications", error });
  }
});

// Update a job application 
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate({_id: req.params.id, user: req.user.id}, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job application", error });
  }
});

// Delete a job application 
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Job.findOneAndDelete({_id: req.params.id, user: req.user.id});

    res.status(200).json({ message: "Job application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job application", error });
  }
});

// Filter applications by status 
router.get("/filter", async (req, res) => {
  try {
    const { status } = req.query;
    const jobs = await Job.find({ status });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error filtering job applications", error });
  }
});

export default router