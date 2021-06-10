require("dotenv").config();
const express = require("express");
const routes = require("./routes");
require("./db");

const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send("Welcome to Crypto Rewards"));
app.use("/api/", routes.campaign);

module.exports = app;