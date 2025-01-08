const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Doctor = require("./Doctor");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.STRING(50), // Explicitly set as STRING with length
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING, // Explicitly set as STRING with length
      allowNull: true,
    },
  },
  { timestamps: true }
);

// Force the table to be recreated with the new schema
sequelize.sync({ force: true });

module.exports = Appointment;
