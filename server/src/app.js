require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const mongodbUri =
  process.env.MONGODB_URI || "mongodb://localhost/crypto-rewards";
const options = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongodbUri, options);

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Welcome to Crypto Rewards"));
app.use("/api/", routes.campaign);
app.use("/api/", routes.user);
app.use("/api/", routes.userCampaign);

module.exports = app;
