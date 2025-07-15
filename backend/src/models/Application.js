import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["saved", "applied", "interviewing", "offer", "rejected"],
      default: "saved",
    },
    salary: {
      type: String,
      default: "",
    },
    techStack: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    resumeUsedUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    appliedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
