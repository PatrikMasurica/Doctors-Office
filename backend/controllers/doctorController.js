const Doctor = require("../models/Doctor");

// Fetch all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ["id", "name", "specialization", "availableSlots"],
    });
    res.status(200).json(doctors); // Return all doctors
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization, availableSlots, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    // Create a new doctor with default availableSlots if not provided
    const doctor = await Doctor.create({
      name,
      email,
      password,
      specialization,
      availableSlots: availableSlots || [
        "Monday 09:00",
        "Monday 10:00",
        "Monday 11:00",
        "Monday 14:00",
        "Monday 15:00",
      ],
    });

    // Remove password from response
    const { password: _, ...doctorData } = doctor.toJSON();
    res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: doctorData });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res
      .status(500)
      .json({ error: "Failed to add doctor", details: err.message });
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
