const express = require("express");
const {
  bookAppointment,
  getAppointments,
  deleteAppointment,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware"); // Import authMiddleware
const router = express.Router();

// Doctor's dashboard: view appointments (protected route)
router.get("/dashboard", authMiddleware(), getAppointments);

// Public route to book an appointment
router.post("/book", bookAppointment);

// Route to delete an appointment
router.delete("/:id", deleteAppointment);

module.exports = router;
