const JWT = require("jsonwebtoken");
const config = require("config");

signToken = user => {
  return JWT.sign(
    {
      iss: "GtechSolutions",
      id: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    config.jwtSecret
  );
};

module.exports = {
  signIn: async (req, res, next) => {
    try {
    } catch (error) {}
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  // this is a way to test that a valid json web token has been granted - a jsonwebtoken is required to access {secret: "resource"}

  secret: async (req, res, next) => {
    res.json({ secret: "resource" });
  }
};
