const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, patientEmail, appointmentTime } = req.body;

    // Validate required fields
    if (!doctorId || !patientName || !patientEmail || !appointmentTime) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Find doctor
    const doctor = await Doctor.findByPk(parseInt(doctorId));
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Validate if the slot is available
    if (!doctor.availableSlots.includes(appointmentTime)) {
      return res.status(400).json({ error: "This time slot is not available" });
    }

    // Create appointment
    const appointment = await Appointment.create({
      doctorId: parseInt(doctorId),
      patientName,
      patientEmail,
      appointmentTime,
    });

    // Update doctor's available slots
    const updatedSlots = doctor.availableSlots.filter(
      (slot) => slot !== appointmentTime
    );
    await doctor.update({ availableSlots: updatedSlots });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Appointment booking error:", error);
    res.status(500).json({
      error: "Failed to book appointment",
      details: error.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const doctor = await Doctor.findByPk(appointment.doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    doctor.availableSlots.push(appointment.appointmentTime);
    await doctor.save();

    await appointment.destroy();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { id: doctorId } = req.user;
    const appointments = await Appointment.findAll({
      where: { doctorId },
      order: [["appointmentTime", "ASC"]],
    });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
