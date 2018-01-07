const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// comment#new
router.get("/new", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground});
    }
  });
});

// comment#create
router.post("/", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "Something went wrong");
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Successfully added comment!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// comment#edit
router.get("/:commentId/edit", middleware.checkCommentOwnership, (req, res) => {
  res.render("comments/edit", {campgroundId: req.params.id, comment: req.comment});
});

// comment#update
router.put("/:commentId", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, comment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// comment#destroy
router.delete("/:commentId", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, err => {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


module.exports = router;