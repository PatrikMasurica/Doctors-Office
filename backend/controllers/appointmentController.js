const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, appointmentTime } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Check if patient exists
    const patient = await Patient.findByPk(patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const appointment = await Appointment.create({
      doctorId,
      patientId,
      appointmentTime,
      status: "pending",
    });

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const role = req.user.role;

    let appointments;
    if (role === "doctor") {
      appointments = await Appointment.findAll({
        where: { doctorId: req.user.id },
      });
    } else if (role === "patient") {
      appointments = await Appointment.findAll({
        where: { patientId: req.user.id },
      });
    } else {
      appointments = await Appointment.findAll();
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    appointment.status = status || appointment.status;
    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};
