const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
require("dotenv").config();

// Doctor Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Validate required fields
    if (!name || !email || !password || !specialization) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the email already exists
    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default time slots
    const defaultSlots = [
      "Monday 09:00",
      "Monday 10:00",
      "Monday 11:00",
      "Monday 14:00",
      "Monday 15:00",
      "Tuesday 09:00",
      "Tuesday 10:00",
      "Tuesday 11:00",
      "Tuesday 14:00",
      "Tuesday 15:00",
      "Wednesday 09:00",
      "Wednesday 10:00",
      "Wednesday 11:00",
      "Wednesday 14:00",
      "Wednesday 15:00",
      "Thursday 09:00",
      "Thursday 10:00",
      "Thursday 11:00",
      "Thursday 14:00",
      "Thursday 15:00",
      "Friday 09:00",
      "Friday 10:00",
      "Friday 11:00",
      "Friday 14:00",
      "Friday 15:00",
    ];

    // Create the doctor with default time slots
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      availableSlots: defaultSlots,
    });

    res.status(201).json({ message: "Doctor registered successfully", doctor });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Failed to register doctor" });
  }
};

// Doctor Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token, doctorId: doctor.id });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Failed to log in" });
  }
};
