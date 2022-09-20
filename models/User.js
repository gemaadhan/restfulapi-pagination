const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

module.exports = mongoose.model("User", userSchema);
