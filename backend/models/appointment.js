const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Doctor = require("./doctor");
const Patient = require("./patient");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

Appointment.belongsTo(Doctor, { foreignKey: "doctorId", onDelete: "CASCADE" });
Appointment.belongsTo(Patient, {
  foreignKey: "patientId",
  onDelete: "CASCADE",
});

module.exports = Appointment;
