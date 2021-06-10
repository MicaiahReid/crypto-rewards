const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/crypto-rewards";
const options = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(mongodbUri, options);