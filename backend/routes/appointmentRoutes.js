const express = require("express");
const {
  bookAppointment,
  getAppointments,
  updateAppointment,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Patients book appointments
router.post("/", authMiddleware(["patient"]), bookAppointment);

// Doctors and Patients view appointments; Admins see all
router.get(
  "/",
  authMiddleware(["admin", "doctor", "patient"]),
  getAppointments
);

// Doctors and Admins update appointment status
router.put("/:id", authMiddleware(["doctor", "admin"]), updateAppointment);

module.exports = router;
