const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware");

// root
router.get("/", (req, res) => {
  res.render("landing");
});

// user#new
router.get("/register", (req, res) => {
  res.render("register");
});

// user#create
router.post("/register", (req, res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    });
  });
});

// session#new
router.get("/login", (req, res) => {
  res.render("login");
});

// session#create
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req, res) => {
});

// session#destroy
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});


module.exports = router;