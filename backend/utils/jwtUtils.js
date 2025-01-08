const mysql = require("mysql2/promise");
require("dotenv").config();

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`Database '${process.env.DB_NAME}' is ready.`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error.message);
  }
};

module.exports = initDatabase;
