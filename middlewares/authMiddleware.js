const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || 'your_default_secret';
module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log(`Auth successful: User ID ${req.userId} authenticated.`);
    next();
  } catch {
    console.error("Auth failed: Token is not valid", err.message);
    res.status(401).json({ message: "Token invalid" });
  }
};
