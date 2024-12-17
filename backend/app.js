const express = require("express");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/patients", require("./routes/patientRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));

app.use(errorHandler);

app.listen(3000);

module.exports = app;
