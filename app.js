const express = require("express");
const cors = require("cors");
const { expressjwt } = require("express-jwt");

const { login, signup } = require("./handlers/authHandler");
const {
  createSoil,
  getAllSoils,
  addSampleSoils,
  chatAboutSoils,
} = require("./handlers/soilController");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  }).unless({
    path: ["/api/auth/login", "/api/auth/signup"],
  })
);

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date(),
    session: 1,
  });
});

app.post("/api/echo", (req, res) => {
  res.json({
    message: "Message recieved!",
    data: req.body,
    timestamp: new Date(),
  });
});

// Authentication
app.post("/api/auth/login", login);
app.post("/api/auth/signup", signup);

app.post("/api/soil", createSoil);
app.get("/api/soil", getAllSoils);

app.post("/api/soil/sample", addSampleSoils);
app.post("/api/soil/chat", chatAboutSoils);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server not started: ", err.message);
  }
  console.log(`Server started at port ${PORT}`);
});
