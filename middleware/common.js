// Init
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// Common Middleware
module.exports = (app) => {
  app.use(cors({ credentials: true, origin: true }));
  app.use(
    session({
      secret: "secretCode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/uploads", express.static("uploads", { maxAge: "31536000" }));
};
