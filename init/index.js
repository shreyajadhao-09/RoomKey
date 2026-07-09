const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


const dns = require("dns");
require("dotenv").config();


dns.setServers(["8.8.8.8", "1.1.1.1"]);
// main()
//   .then(() => {
//     console.log("cuection succesfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

main()
  .then(() => {
    console.log("connection successfully");
    return initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6a4faefb9232db5c0f1cb146",
  }));
  await Listing.insertMany(initdata.data);
  console.log("Data was initialized");
};

// initDB();
