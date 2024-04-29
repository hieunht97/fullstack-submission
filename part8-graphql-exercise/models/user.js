const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "username must be at least 3 characters long"],
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", schema);
