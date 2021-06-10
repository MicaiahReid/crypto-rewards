require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/crypto-rewards";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongodbUri, options);

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => res.send("Welcome to Crypto Rewards"));
app.use("/api/", routes.campaign);

module.exports = app;