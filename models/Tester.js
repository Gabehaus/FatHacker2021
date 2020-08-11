const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");

const Schema = mongoose.Schema;
mongoose.Types.Decimal128.prototype.toJSON =
  mongoose.Types.Decimal128.prototype.toString;

const TesterSchema = new Schema(
  {
    sport: { type: String, required: true }
  },
  {
    timestamps: false
  }
);

const Tester = mongoose.model("tester", TesterSchema);

module.exports = Tester;
