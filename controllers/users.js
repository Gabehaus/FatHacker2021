const User = require("../models/User");
const JWT = require("jsonwebtoken");
const config = require("config");

signToken = user => {
  return JWT.sign(
    {
      iss: "GtechSolutions",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    config.jwtSecret
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password, confirm_password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      method: "local",
      local: {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password
      }
    });

    await newUser.save();

    //Generate the token
    const token = signToken(newUser);

    // respond with token
    res.status(200).json({ token });
  }
};
