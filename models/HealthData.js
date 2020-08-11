const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");

const Schema = mongoose.Schema;

//create Schema
const HealthDataSchema = new Schema({
  username: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  goal: { type: String, required: true },
  activityLevel: { type: String, required: true }
});

const HealthData = mongoose.model("healthData", HealthDataSchema);

module.exports = HealthData;
