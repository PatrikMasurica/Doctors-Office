const sequelize = require("../config/database");
const User = require("./User");
const Doctor = require("./Doctor");
const Patient = require("./Patient");
const Appointment = require("./Appointment");

// Associate models if relationships exist
User.hasMany(Appointment, { foreignKey: "patientId", as: "appointments" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "patientId", as: "patient" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });

module.exports = { sequelize, User, Doctor, Patient, Appointment };
