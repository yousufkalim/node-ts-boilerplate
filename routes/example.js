// Init
const router = require("express").Router();
const { getAll } = require("../controllers/example");
const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.get("/", getAll);
router.post("/", validateExample, isValidated, getAll);

// Export
module.exports = router;
