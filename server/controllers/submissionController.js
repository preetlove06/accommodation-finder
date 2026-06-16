const PropertySubmission = require("../models/PropertySubmission");

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await PropertySubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubmission = async (req, res) => {
  try {
    const submission = await PropertySubmission.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSubmissionStatus = async (req, res) => {
  try {
    const submission = await PropertySubmission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};