const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "s3cret";
const bcrypt = require("bcrypt");
const cors = require("cors");

mongoose.connect("mongodb+srv://123prasadsutar:prasad@cluster0.tny46.mongodb.net/");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/signup", async function (req, res) {

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
        console.log("error")
    }

    res.json({
        message: "You are signed up"
    })
});



app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    });
    if (!response) {
        req.status(403).json({
            message: "users does not exist in the database"
        })
        return
    }
    const p = response.password;
    console.log(p);
    const checkPass = bcrypt.compare(password, response.password);
    console.log(response);
    if (checkPass) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET, {
            expiresIn: '1h' // optional, adjust the expiration time as needed
        });

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;