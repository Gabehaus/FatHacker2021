const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-token-google").Strategy; //const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const config = require("config");
const User = require("./models/User");

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("bearer"),
      secretOrKey: config.jwtSecret
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        //req.user = user;
        done(null, user); // this user payload is accessible via req.user
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//GOOGLE OAUTH STRATEGY
passport.use(
  "googleToken",
  new GoogleStrategy(
    {
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        //takes any characters occuring before the "@" sign in the email and assigns this as name
        const name = profile.emails[0].value.match(/([^@]+)/);

        //If new account
        const newUser = new User({
          method: "google",
          google: {
            name: name[0],
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

//FACEBOOK OAUTH STRATEGY
passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: config.oauth.facebook.clientID,
      clientSecret: config.oauth.facebook.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = new User({
          method: "facebook",
          facebook: {
            name: profile.displayName,
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // if not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        //otherwise, return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
