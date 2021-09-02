// LIBRARIES:
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

// ROUTES:
const pinRoute = require("./routes/pinRoute");
const userRoute = require("./routes/userRoute");

const port = process.env.PORT || 3000;
const host = process.env.HOST;

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/mern-travel-app`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
mongoose.connection
  .on("connected", () => {
    console.log("Database already Connected");
  })
  .on("error", (err) => {
    console.error({ error: err });
  });

const app = express();
app.use(express.json());

app.use("/api", pinRoute);
app.use("/user", userRoute);

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
