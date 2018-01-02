const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


const campgrounds = [
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg"},
]

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds})
});

app.post("/campgrounds", (req, res) => {
  campgrounds.push({name: req.body.name, image: req.body.image});
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => console.log("YelpCamp server running on port 3000"));