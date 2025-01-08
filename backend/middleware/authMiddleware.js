const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the authenticated doctor info to `req`
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
