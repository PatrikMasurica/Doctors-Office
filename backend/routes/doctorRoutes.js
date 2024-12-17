const express = require("express");
const {
  getAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Only Admins can manage doctors
router.get("/", authMiddleware(["admin"]), getAllDoctors);
router.post("/", addDoctor);
router.put("/:id", authMiddleware(["admin"]), updateDoctor);
router.delete("/:id", authMiddleware(["admin"]), deleteDoctor);

module.exports = router;
