const express = require("express");
const { getAllDoctors } = require("../controllers/doctorController");
const router = express.Router();

router.get("/", getAllDoctors); // Public route to fetch all doctors

module.exports = router;
