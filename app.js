const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds});
    }
  });
});

app.post("/campgrounds", (req, res) => {
  const campgroundData = {
    name: req.body.name,
    image: req.body.image
  }
  Campground.create(campgroundData, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => console.log("YelpCamp server running on port 3000"));