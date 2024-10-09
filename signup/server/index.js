const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "s3cret";
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://123prasadsutar:prasad@cluster0.tny46.mongodb.net/");
const app = express();
app.use(express.json());

// Custom CORS handler function
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
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

// Example usage with a handler
const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

app.post("/signup", allowCors(async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    const name = req.body.name;
    const hashPassword = await bcrypt.hash(password, 5);
    console.log(hashPassword);
    try {
        await UserModel.create({
            email: email,
            password: hashPassword,
            name: name
        });
    } catch (error) {
        console.log("error");
    }
    res.json({
        message: "You are signed up"
    });
}));

// Additional routes can be added similarly

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
