const { sequelize } = require("./models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    // Sync tables
    await sequelize.sync({ alter: true }); // Use `force: true` only during development
    console.log("All tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
})();
