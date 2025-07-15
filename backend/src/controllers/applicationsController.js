import Application from "../models/Application.js";

// @desc   GET All applications
// @route  GET /api/applications
export const getAllApplications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ user: userId });
    res.status(200).json(applications);
  } catch (err) {
    next(err);
  }
};

// @desc   Post applications
// @route  Post /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const user = req.user._id;
    const {
      title,
      company,
      companyLogo,
      location,
      sourceUrl,
      status = "saved", // fallback
      salary,
      techStack,
      requirements,
      responsibilities,
      notes,
      tags,
      appliedAt,
    } = req.body;

    const newApplication = new Application({
      user,
      title,
      companyLogo,
      company,
      location,
      sourceUrl,
      status,
      salary,
      techStack,
      requirements,
      responsibilities,
      notes,
      tags,
      appliedAt,
    });

    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: "Application successfully created!",
      application: savedApplication,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   GET Application by id
// @route  GET /api/applications/:id

export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const application = await Application.findOne({ _id: id, user: userId });
    if (!application) {
      return res
        .status(404)
        .json({ error: "Application not found or unauthorized" });
    }

    res.status(200).json(application);
  } catch (err) {
    next(err);
  }
};

// @desc   Update Application by id
// @route  PUT /api/applications/:id

export const updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const {
      title,
      company,
      companyLogo,
      location,
      sourceUrl,
      status,
      salary,
      techStack,
      requirements,
      responsibilities,
      notes,
      tags,
      appliedAt,
    } = req.body;

    // Ensure application exists and belongs to current user
    const existingApp = await Application.findOne({ _id: id, user: userId });
    if (!existingApp) {
      return res
        .status(404)
        .json({ error: "Application not found or unauthorized" });
    }

    // Update fields
    const updatedApp = await Application.findByIdAndUpdate(
      id,
      {
        title,
        company,
        companyLogo,
        location,
        sourceUrl,
        status,
        salary,
        techStack,
        requirements,
        responsibilities,
        notes,
        tags,
        appliedAt,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Application successfully updated!",
      application: updatedApp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Delete Application by id
// @route  DELETE /api/applications/:id

export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deleted = await Application.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.status(404).json({ error: "Application not found or unauthorized" });
    }

    res.status(200).json({ message: "Application successfully deleted!" });
  } catch (err) {
    next(err);
  }
};
