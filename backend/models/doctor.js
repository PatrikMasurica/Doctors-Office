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
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
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
