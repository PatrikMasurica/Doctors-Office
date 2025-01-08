const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Doctor extends Model {}

Doctor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availableSlots: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
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
      ],
      get() {
        const value = this.getDataValue("availableSlots");
        return value ? (Array.isArray(value) ? value : JSON.parse(value)) : [];
      },
    },
  },
  {
    sequelize,
    modelName: "Doctor",
  }
);

module.exports = Doctor;
