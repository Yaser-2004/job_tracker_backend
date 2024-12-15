import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offered", "Rejected"],
    default: "Applied",
  },
  dateApplied: { type: Date, required: true },
  notes: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
