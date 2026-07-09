const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
require("dotenv").config();

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // match whatever you use in app.js

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { "geometry.coordinates": { $exists: false } },
      { "geometry.coordinates": { $size: 0 } },
    ],
  });

  console.log(`Found ${listings.length} listings without geometry`);

  for (let listing of listings) {
    const query = `${listing.location}, ${listing.country}`;
    try {
      const res = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_API_KEY}`,
      );
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: data.features[0].geometry.coordinates,
        };
        await listing.save();
        console.log(`✅ Updated: ${listing.title}`);
      } else {
        console.log(`⚠️ No match found for: ${listing.title} (${query})`);
      }
    } catch (err) {
      console.log(`❌ Error geocoding ${listing.title}:`, err.message);
    }

    // avoid hitting MapTiler rate limits
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log("Done!");
  mongoose.connection.close();
}

main();
