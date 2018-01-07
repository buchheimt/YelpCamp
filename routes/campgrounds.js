const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, (req, res) => {
  const campgroundData = {
    name: req.body.name,
    price: req.body.price,
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// campground#show
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err || !campground) {
      console.log(err);
      req.flash("error", "Sorry, that campground does not exist");
      return res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/show", {campground});
    }
  });
});

// campground#edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  res.render("campgrounds/edit", {campground: req.campground});
});

// campground#update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + campground._id);
    }
  });
});

// campgrounds#destroy
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;