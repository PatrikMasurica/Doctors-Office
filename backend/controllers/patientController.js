const Patient = require("../models/Patient");

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve patients" });
  }
};

exports.addPatient = async (req, res) => {
  try {
    const { name, dob, email, phone } = req.body;
    const patient = await Patient.create({ name, dob, email, phone });
    res.status(201).json({ message: "Patient added successfully", patient });
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient" });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve patient" });
  }
};
