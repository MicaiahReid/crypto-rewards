
const fs = require("fs");
const mongoose = require("mongoose");

const { campaign } = require("../models")

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/crypto-rewards";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongodbUri, options);

const seed = async () => {
  try {
    const path = "src/scripts/campaign";
    const files = await fs.promises.readdir(path);
    for (const file of files) {
      const fileBuffer = await fs.promises.readFile(`${path}/${file}`);
      const fileObject = JSON.parse(fileBuffer.toString());
      const seedCampaign = new campaign(fileObject);
      await seedCampaign.save();
    }
  } catch (error) {
    console.log(error)
  }
  process.exit(0);
}

seed();