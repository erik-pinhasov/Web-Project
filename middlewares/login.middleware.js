// Middleware for checking if the user is logged in using JWT
// If user not logged in redirect to the sign-in page

const { Router } = require("express");
const router = Router();

const jwt = router.use((req, res, next) => {
  if (!req.session.user) {
    res.redirect("/users/signin");
  } else {
    next();
  }
});

module.exports = jwt;
