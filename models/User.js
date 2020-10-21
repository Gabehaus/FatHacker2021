const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    name: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    confirm_password: { type: String }
  },
  google: {
    name: { type: String },
    id: { type: String },
    email: { type: String, lowercase: true }
  },
  facebook: {
    name: { type: String },
    id: { type: String },
    email: { type: String, lowercase: true }
  }
});

// this is called before a new user is saved
UserSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    //Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;

    //repeat process for local.confirm_password
    const salt2 = await bcrypt.genSalt(10);
    const confirm_passwordHash = await bcrypt.hash(
      this.local.confirm_password,
      salt
    );
    this.local.confirm_password = confirm_passwordHash;
    /*
    const confirm_passwordHash = await bcrypt.hash(
      this.local.confirm_password,
      salt
    );
    this.local.confirm_password = confirm_passwordHash; */
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = User = mongoose.model("user", UserSchema);
