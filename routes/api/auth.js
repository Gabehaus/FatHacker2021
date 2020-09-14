const express = require("express");

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const AuthController = require("../../controllers/auth");
const router = require("express-promise-router")();
const { validateBody, schemas } = require("../../helpers/routeHelpers");
const passport = require("passport"); // passport library
const passportConf = require("../../passport"); // passport file
const passportSignIn = passport.authenticate("local", { session: false }); //checks for existing email and correct password
const passportJWT = passport.authenticate("jwt", { session: false }); //gets token from header, decodes it with secret and returns the user
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false
});

// User Model
const User = require("../../models/User");

// @route GET api/auth
//@desc Authenticate user
// @access Public
router.post(
  "/",
  validateBody(schemas.usersSchema),
  passportSignIn,
  AuthController.signIn
);

router.get("/secret", passportJWT, AuthController.secret); //because this contains the passwportJWT strategy, access to the protected resources returned from this route is granted

router.post("/oauth/google", passportGoogle, AuthController.googleOAuth);

router.post("/oauth/facebook", passportFacebook, AuthController.facebookOAuth);

// @route GET api/auth/user
//@desc Get user data using token
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id) //req.user is the token... the id property was attached to the token above
    .select("-password") //says to not include the password when returning user data
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
