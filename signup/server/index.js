const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT_SECRET = "s3cret";

// Custom CORS handler function
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// MongoDB connection
mongoose.connect("mongodb+srv://123prasadsutar:prasad@cluster0.tny46.mongodb.net/");

const app = express();
app.use(express.json());

// Sample handler (you can apply it to any route like this)
const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

// Wrap the handler with the custom allowCors function
app.get("/", allowCors(handler));

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const hashPassword = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      email: email,
      password: hashPassword,
      name: name,
    });
    res.json({
      message: "You are signed up",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Additional routes...

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
