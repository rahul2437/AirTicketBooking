const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  encrypted_password: {
    type: String,
    required: true,
  },
});

userSchema.virtual("password").set(function (password) {
  this.encrypted_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (entered_password) {
    return bcrypt.compareSync(entered_password, this.encrypted_password);
  },
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
