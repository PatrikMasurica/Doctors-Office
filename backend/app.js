const express = require("express");
const bodyParser = require("body-parser");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 8585;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
