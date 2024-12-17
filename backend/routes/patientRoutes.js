const express = require("express");
const {
  getAllPatients,
  addPatient,
  getPatientById,
} = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Admins and Doctors can manage/view patients
router.get("/", authMiddleware(["admin", "doctor"]), getAllPatients);
router.post("/", authMiddleware(["admin", "doctor"]), addPatient);
router.get("/:id", authMiddleware(["admin", "doctor"]), getPatientById);

module.exports = router;
