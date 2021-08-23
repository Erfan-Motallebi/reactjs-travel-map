const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      require: true,
      min: 3,
      max: 30,
      unique: true,
    },
    title: {
      type: String,
      require: true,
      max: 30,
    },
    description: {
      type: String,
      require: true,
      max: 50,
    },
    lat: {
      type: mongoose.SchemaTypes.Number,
      require: true,
    },
    long: {
      type: mongoose.SchemaTypes.Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", pinSchema);
