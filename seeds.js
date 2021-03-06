const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [
  {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio ratione libero quos, sapiente numquam mollitia minus porro dicta nihil quo molestias fugit obcaecati non ipsa ea neque consectetur explicabo!"},
  {name: "Granite Hill", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio ratione libero quos, sapiente numquam mollitia minus porro dicta nihil quo molestias fugit obcaecati non ipsa ea neque consectetur explicabo!"},
  {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur distinctio ratione libero quos, sapiente numquam mollitia minus porro dicta nihil quo molestias fugit obcaecati non ipsa ea neque consectetur explicabo!"}
]

function seedDB() {
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds!");
      // seeds.forEach(seed => {
      //   Campground.create(seed, (err, campground) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("added a campground");
      //       Comment.create({
      //         text: "This place is great, but I wish there was internet",
      //         author: "Homer"
      //       }, (err, comment) => {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           console.log("added a comment");
      //           campground.comments.push(comment);
      //           campground.save();
      //         }
      //       });
      //     }
      //   });
      // });
    }
  });
  
  
}

module.exports = seedDB;