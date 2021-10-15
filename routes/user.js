// Init
const router = require("express").Router();
const multer = require("multer");
const {
  getAll,
  register,
  login,
  loggedIn,
  checkAuth,
  logout,
} = require("../controllers/user");
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
router.get("/loggedin", checkAuth, loggedIn);
router.delete("/logout", logout);
// google auth routes 1st one redirects users to google  2nd one sends the response
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureMessage: "Authentication failed" }),
  loggedIn
);
// facebook auth routes 1st one redirects users to facebook 2nd one sends the response
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureMessage: "Authentication failed",
  }),
  loggedIn
);
// add more routes here

// Export
module.exports = router;
