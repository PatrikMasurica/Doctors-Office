const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const createAppointment = async (req, res) => {
  const { doctorId, patientId, date, reason } = req.body;

  try {
    const doctor = await Doctor.findByPk(doctorId);
    const patient = await Patient.findByPk(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      reason,
    });
    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Doctor, attributes: ["name", "specialization"] },
        { model: Patient, attributes: ["name", "age", "phone"] },
      ],
    });
    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
