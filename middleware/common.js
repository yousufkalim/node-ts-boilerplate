// Init
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// Common Middleware
module.exports = (app) => {
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/uploads", express.static("uploads", { maxAge: "31536000" }));
};
