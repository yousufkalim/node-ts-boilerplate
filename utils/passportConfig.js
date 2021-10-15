// init
const db = require("../database");
const User = db.User;
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// export passport strategy
module.exports = function (passport) {
  // creating local passport strategy
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  // creating google passport strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );
  // creating facebook passport strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.callbackURL,
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate().then(function (err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        });
      }
    )
  );
  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // DeserializeUser
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      if (err) return done(err);
      return done(null, user);
    });
  });
};
