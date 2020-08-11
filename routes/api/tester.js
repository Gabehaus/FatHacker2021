const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Tester = require("../../models/Tester");

// @route GET api/items
//@desc Get ALL Items
// @access Public
router.get("/", (req, res) => {
  Tester.find()
    .sort({ date: -1 })
    .then(testers => res.json(testers));
});

// @route POST api/items
//@desc Create An Item
// @access Private

router.post("/", (req, res) => {
  const newTester = new Tester({
    sport: req.body.sport
  });

  newTester.save().then(tester => res.json(tester));
});

// @route DELETC api/items/:id
//@desc DELETE An Item
// @access Private

module.exports = router;
