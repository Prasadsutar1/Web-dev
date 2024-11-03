const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "s3cret";
const bcrypt = require("bcrypt");
const cors = require("cors");

mongoose.connect("mongodb+srv://123prasadsutar:prasad@cluster0.tny46.mongodb.net/Users");
const app = express();
app.use(cors());
app.use(express.json());
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
        res.json({
            message: error
        })
        return;
    }


    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const response = await UserModel.findOne({
            email: email
        });
        if (!response) {
            res.status(403).json({
                message: "users does not exist in the database"
            })
            return
        }
        const p = response.password;
        const checkPass = await bcrypt.compare(password, response.password);
        if (checkPass) {
            const token = jwt.sign({
                id: response._id.toString()
            }, JWT_SECRET, {
                expiresIn: '1h' // optional, adjust the expiration time as needed
            });

            res.json({
                token: token,
                message: "&#10004; Signed in"
            })
        } else {
            res.status(403).json({
                message: "Incorrect creds"
            })
        }
    }
    catch (error) {
        res.status(405).json({
            message: error
        })
    }
});

function auth(req, res, next) {
    const token = req.header.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.userId;
        next();
    }
    else {
        req.status(403).json({
            message: "Access denied. No token provided"
        })
    }
}

app.listen(3005);