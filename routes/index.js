// Init
const router = require("express").Router();

// All Routes
router.use("/user", require("./user")); ///all user routes
// add more routes here

// Export
module.exports = router;
