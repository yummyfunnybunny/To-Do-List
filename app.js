const express = require("express");
const bodyParser = require("express");
const date = require(__dirname + "/date.js");

const app = express();

// Initialize the Arrays
const items = ["carrots", "cheese","crackers"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Get the day of the week for the title
app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});
});

// Post the new item to either the workItems array or the Items array
app.post("/", function(req,res){
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// Get the work page
app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

// Get the about page
app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("server started on port 3000.");
});
