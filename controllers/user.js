// init
const db = require("../database");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../utils/passportConfig")(passport);
const User = db.User;

// get all users
async function getAll(req, res) {
  try {
    //   getting all users from user cellection
    let users = await User.find();
    // sending user in response
    res.json({ status: 200, users });
  } catch (err) {
    //   sending error in response
    res.status(500).json(err);
  }
}

// register user
async function register(req, res) {
  try {
    //   checking if email already exist
    if (await User.findOne({ email: req.body.email })) {
      throw 'Email "' + req.body.email + '" is already taken';
    }
    // checking for picture
    if (req.file) {
      req.body = { ...req.body, picture: req.file.path };
    }
    // intializing user object
    const user = new User(req.body);

    // hashing password
    user.password = bcrypt.hashSync(req.body.password, 10);

    //   saving user
    await user.save();
    // sending error in response with status code of 200
    res.json({ status: 200, user });
  } catch (err) {
    // sending error in response
    res.status(500).json({ error: err.message });
  }
}

// Login user
async function login(req, res, next) {
  try {
    // authentication with passport
    passport.authenticate("local", (err, user, info) => {
      // checking for error
      if (err) throw err;
      // checking for user
      if (!user) {
        res.send("Invalid email or password");
      } else {
        // Logging user in and sending in response
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(user);
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).json(err);
  }
}

// exporting controller functions
module.exports = {
  getAll,
  register,
  login,
};
