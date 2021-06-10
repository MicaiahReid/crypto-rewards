require("dotenv").config();
const cors = require("cors");
const express = require("express");
const routes = require("./routes");
require("./db");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Welcome to Crypto Rewards"));
app.use("/api/", routes.campaign);
app.use("/api/", routes.user);
app.use("/api/", routes.userCampaign);

module.exports = app;
