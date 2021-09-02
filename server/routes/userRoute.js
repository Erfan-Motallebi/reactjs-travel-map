const Router = require("express").Router();
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
// const _ = require("lodash");

Router.post("/login", async (req, res) => {
  // TODO: Find the specific User DONE:
  const user = await User.findOne({
    username: { $eq: req.body.username },
  });
  // TODO: Check the user and validation DONE:
  // TODO: Send the result back excluding password

  if (user) {
    try {
      await bcryptjs.compare(req.body.password, user.password);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({
        error: {
          msg: "User/password Not Right",
        },
      });
    }
  } else {
    res.status(403).json({
      success: false,
      result: [],
      error: {
        msg: "User Not Found",
      },
    });
  }
});
Router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);
  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
  });
  try {
    const newUserResult = await newUser.save();
    res.status(200).json(newUserResult);
  } catch (error) {
    res.status(400).json({
      error: {
        msg: "Fields Required",
      },
    });
  }
});

module.exports = Router;
