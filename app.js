const express = require("express"),
  app = express(),
  users = require("./routes/users"),
  sessions = require("./services/sessions.service"),
  jwt = require("./middlewares/login.middleware");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));
app.use(sessions);
app.use(jwt);

app.get("/", async function (req, res) {
  //
  res.send("hello world");
});
app.use("/users", users);

app.listen(3000, () => console.log("server started"));
