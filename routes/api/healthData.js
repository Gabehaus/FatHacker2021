const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const HealthData = require("../../models/HealthData");

// @route GET api/healthData
//@desc Get ALL health data
// @access Public
router.get("/:username", auth, (req, res) => {
  HealthData.findOne({
    username: req.params.username
  }).then(healthData => {
    if (!healthData) {
      return res.status(400).json({ msg: "Health data does not exist" });
    } else {
      res.json(healthData);
    }
  });
});

//post new health data
// @access Public
router.post("/", (req, res) => {
  const username = req.body.username;
  const sex = req.body.sex;
  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  const goal = req.body.goal;
  const activityLevel = req.body.activityLevel;

  /*
  if (
    !username ||
    !sex ||
    !age ||
    !height ||
    !weight ||
    !goal ||
    !activityLevel
  ) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } */

  /*if (password !== confirm_password) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }*/
  const newHealthData = new HealthData({
    username: username,
    sex: sex,
    age: age,
    height: height,
    weight: weight,
    goal: goal,
    activityLevel: activityLevel
  });

  newHealthData.save().then(newHealthData => res.json(newHealthData));
});

//route to edit
router.post("/update/:username", (req, res) => {
  HealthData.findOne({
    username: req.params.username
  })
    .then(healthData => {
      healthData.username = req.body.username;
      healthData.sex = req.body.sex;
      healthData.age = req.body.age;
      healthData.weight = req.body.weight;
      healthData.height = req.body.height;
      healthData.goal = req.body.goal;
      healthData.activityLevel = req.body.activityLevel;

      healthData
        .save()
        .then(healthData => res.json(healthData))
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});

//for now it appears a delete route isn't needed / doesn't make sense

module.exports = router;
