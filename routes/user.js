// Init
const router = require("express").Router();
const multer = require("multer");
const { getAll, register, login } = require("../controllers/user");
const passport = require("passport");
require("../utils/passportConfig")(passport);
// initilizing multer disk storage
var storage = multer.diskStorage({
  // destination to save data
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  //   file naming convention
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// initilizing multer object
const uploadUsers = multer({ storage: storage });

// Routes
router.get("/", getAll);
router.post("/register", uploadUsers.single("picture"), register);
router.post("/login", login);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);
// add more routes here

// Export
module.exports = router;
