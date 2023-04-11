const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const user = new UserModel({ email, password: hash });
        await user.save();
        res.send({ msg: "User Registered" });
      }
    });
  } catch (error) {
    res.send({ msg: "User Registered Failed" });
    console.log(error);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ foo: "bar" }, "masai");
          res.send({ msg: "User Login Success", token: token });
        } else {
          res.send({ msg: "User Not found" });
        }
      });
    } else {
      res.send({ msg: "Invalid Credential" });
    }
  } catch (error) {
    res.send({ msg: "Invalid Credentials" });
    console.log(error);
  }
});

module.exports = {
  UserRouter,
};
