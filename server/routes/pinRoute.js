const Router = require("express").Router();
const Pin = require("../models/pin.model");

Router.post("/pin", async (req, res) => {
  const newPin = await Pin.create(req.body);
  try {
    const newPinResult = await newPin.save();
    res.status(200).json(newPinResult);
  } catch (err) {
    res.status(400).json(err);
  }
});
Router.get("/pin", async (req, res) => {
  const foundPins = await Pin.find({});
  try {
    res.status(200).json(foundPins);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = Router;
