const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define(
  "Doctor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: false },
    availableSlots: { type: DataTypes.JSON, allowNull: true }, // e.g., ["2024-12-20 10:00", "2024-12-21 14:00"]
  },
  { timestamps: true }
);

module.exports = Doctor;
