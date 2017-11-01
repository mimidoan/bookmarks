const express = require("express"),
  hbs = require("hbs"),
  mongoose = require("mongoose");

const app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// app.post("/register", (req, res) => {
//   // issue a redirect after registration
//   // redirect to a confirmation page or straight to feed
//   res.redirect("register");
// });

app.get("/feed", (req, res) => {
  res.render("feed");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/create", (req, res) => {
  res.render("create");
});




app.listen(8080);
