const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// campground#index
router.get("/", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds});
    }
  });
});

// campground#create
router.post("/", isLoggedIn, (req, res) => {
  const campgroundData = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  }
  Campground.create(campgroundData, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// campground#new
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// campground#show
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground});
    }
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;