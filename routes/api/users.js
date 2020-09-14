const express = require("express");

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const UsersController = require("../../controllers/users");
const router = require("express-promise-router")();
const { validateBody, schemas } = require("../../helpers/routeHelpers");

// User Model
const User = require("../../models/User");

// @route GET api/users
//@desc Register new user
// @access Public
router.post("/", validateBody(schemas.usersSchema), UsersController.signUp);

module.exports = router;
