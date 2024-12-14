const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3307,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL database."))
  .catch((err) => console.error("Error connecting to the database:", err));

module.exports = sequelize;