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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

sequelize.sync({ force: true });

module.exports = Appointment;
