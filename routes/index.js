// Init
const router = require("express").Router();

// All Routes
router.use("/example", require("./example"));

// Export
module.exports = router;
