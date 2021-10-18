// Init
const router = require("express").Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");
const storage = require("../middleware/multer");
const {
  getAll,
  register,
  login,
  loggedIn,
  logout,
} = require("../controllers/user");
const passport = require("passport");
require("../utils/passportConfig")(passport);
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
