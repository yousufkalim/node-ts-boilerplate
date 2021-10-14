//// init
const mongoose = require("mongoose");

//// schema
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  ////  you can add more field here
});

// exporting model
module.exports = mongoose.model("user", userSchema);
