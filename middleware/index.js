const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err || !campground) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else if (campground.author.id.equals(req.user._id)) {
        req.campground = campground;
        next();
      } else {
        req.flash("error", "You don't have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err || !comment) {
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else if (comment.author.id.equals(req.user._id)) {
        req.comment = comment;
        next();
      } else {
        req.flash("error", "You don't have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
  }
}

module.exports = middlewareObj;