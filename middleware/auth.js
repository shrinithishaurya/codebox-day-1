const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authorization = req.get("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticateToken;
