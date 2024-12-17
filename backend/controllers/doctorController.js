const Doctor = require("../models/Doctor");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization, availableSlots } = req.body;

    // Validate required fields
    if (!name || !specialization) {
      return res
        .status(400)
        .json({ error: "Name and specialization are required" });
    }

    // Create a new doctor
    const doctor = await Doctor.create({
      name,
      specialization,
      availableSlots,
    });
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (err) {
    res.status(500).json({ error: "Failed to add doctor" });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, availableSlots } = req.body;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    doctor.name = name || doctor.name;
    doctor.specialization = specialization || doctor.specialization;
    doctor.availableSlots = availableSlots || doctor.availableSlots;

    await doctor.save();
    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (err) {
    res.status(500).json({ error: "Failed to update doctor" });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    await doctor.destroy();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
};
