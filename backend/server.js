const sequelize = require("./config/database");
const app = require("./app");
const Doctor = require("./models/Doctor");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");

    // Sync tables
    await sequelize.sync({ alter: true });
    console.log("All tables created successfully.");

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();

// Force sync all models
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

async function checkDoctors() {
  try {
    const doctors = await Doctor.findAll();
    console.log("Current doctors in database:", doctors);
  } catch (err) {
    console.error("Error checking doctors:", err);
  }
}

checkDoctors();
