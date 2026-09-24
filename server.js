const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const authenticateToken = require("./middleware/auth");

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required. Add it to your local .env file.");
}

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from codebox");
});

app.use("/api/users", usersRouter);

app.get("/api/me", authenticateToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    name: "Alex",
    email: "alex@example.com",
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
