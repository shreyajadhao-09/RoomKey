const Listing = require("../models/listing");

const { config, geocoding } = require("@maptiler/client");
config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", {
    listing,
    mapToken: process.env.MAPTILER_API_KEY,
  });
};

// module.exports.createLiating = async (req, res, next) => {
//   let url = req.file.path;
//   let filename = req.file.filename;
//   const newListing = new Listing(req.body.listing);
//   newListing.image = { url, filename };
//   newListing.owner = req.user._id;
//   await newListing.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };

module.exports.createLiating = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);

  // Get coordinates from MapTiler
  const result = await geocoding.forward(newListing.location);

  if (!result.features || result.features.length === 0) {
    req.flash("error", "Invalid location.");
    return res.redirect("/listings/new");
  }

  newListing.geometry = {
    type: "Point",
    coordinates: result.features[0].geometry.coordinates,
  };

  newListing.image = { url, filename };
  newListing.owner = req.user._id;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditform = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let DeleteListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
//search
module.exports.searchListings = async (req, res) => {
  const { query } = req.query;

  const allListings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
    ],
  });

  res.render("listings/index.ejs", { allListings });
};
