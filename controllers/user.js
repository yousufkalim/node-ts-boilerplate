// init
const db = require("../database");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../utils/passportConfig")(passport);
const User = db.User;

// get all users
exports.getAll = async (req, res) => {
  try {
    //   getting all users from user cellection
    let users = await User.find();
    // sending user in response
    res.json({ users });
  } catch (err) {
    console.log("Error --------> ", err);
    //   sending error in response
    res.status(500).json(err);
  }
};

// register user
exports.register = async (req, res) => {
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
    res.json({ user });
  } catch (err) {
    console.log("Error --------> ", err);
    // sending error in response
    res.status(500).json(err);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    // authentication with passport
    passport.authenticate("local", (err, user, info) => {
      // checking for error
      if (err) throw err;
      // checking for user
      if (!user) {
        res.status(401).json(info.message);
      } else {
        // Logging user in and sending in response
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(user);
        });
      }
    })(req, res, next);
  } catch (err) {
    console.log("Error --------> ", err);
    res.status(500).json(err);
  }
};

// sending the logged in user in response
exports.loggedIn = async (req, res) => {
  res.json({ user: req.user });
};

// logout user
exports.logout = async (req, res) => {
  try {
    req.logOut();
    res.status(200).send("Logout successfully");
  } catch (err) {
    console.log("Error --------> ", err);
    res.status(500).json(err);
  }
};
