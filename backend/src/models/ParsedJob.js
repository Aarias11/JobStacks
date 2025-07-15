// backend/src/models/ParsedJob.js
import mongoose from "mongoose";

const parsedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    companyLogo: {
      type: String,
      default: "",
    },
    location: {
      type: [String],
      default: [],
    },
    sourceUrl: {
      type: String,
      default: "",
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
    niceToHaves: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    appliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ParsedJob = mongoose.model("ParsedJob", parsedJobSchema);

export default ParsedJob;
