const express = require("express"),
  hbs = require("hbs"),
  mongoose = require("mongoose");

const app = express();

app.use(express.static('public'))

app.get("/home", (req, res) => {
  res.render("home.hbs");
});

app.get("/login", (req, res) => {
  res.render("login.hbs");
});

app.get("/register", (req, res) => {
  res.render("register.hbs");
});

// app.post("/register", (req, res) => {
//   // issue a redirect after registration
//   // redirect to a confirmation page or straight to feed
//   res.redirect("register.hbs");
// });

app.get("/feed", (req, res) => {
  res.render("feed.hbs");
});

app.get("/confirm", (req, res) => {
  res.render("confirm.hbs");
});

app.get("/user", (req, res) => {
  res.render("user.hbs");
});

app.get("/create", (req, res) => {
  res.render("create.hbs");
});




app.listen(3000);
