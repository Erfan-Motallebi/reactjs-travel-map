const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      require: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    email: {
      type: String,
      require: true,
      max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
