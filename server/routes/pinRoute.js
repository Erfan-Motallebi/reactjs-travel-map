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
Router.get("/pins", async (req, res) => {
  const foundPins = await Pin.find({});
  try {
    res.status(200).json(foundPins);
  } catch (err) {
    res.status(400).json(err);
  }
});

Router.delete("/pin", async (req, res) => {
  const { pinId } = req.query;
  try {
    const removedPin = await Pin.findByIdAndRemove(pinId);
    res.status(200).json(removedPin);
  } catch (error) {
    res.status(404).json({
      msg: "Failed to remove the proper pin",
    });
  }
});

module.exports = Router;
