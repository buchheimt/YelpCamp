const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// comment#new
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground});
    }
  });
});

// comment#create
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// comment#edit
router.get("/:commentId/edit", checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.commentId, (err, comment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campgroundId: req.params.id, comment});
    }
  });
});

// comment#update
router.put("/:commentId", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, comment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// comment#destroy
router.delete("/:commentId", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, err => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err) {
        res.redirect("back");
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;