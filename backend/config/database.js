const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  host: process.env.DB_HOST,
  dialect: "mysql", // Change this to your database dialect (e.g., 'postgres', 'sqlite', etc.)
  logging: false, // Disable logging; set to `true` if you want to see raw SQL queries
});

module.exports = sequelize;
