const JWT = require("jsonwebtoken");
const { User } = require("../models/user.model");

//SIGN UP A NEW USER
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Bad Request" });
  } else {
    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const user = new User({ name, email, password });
        user.save((err, data) => {
          if (err)
            return res
              .status(400)
              .json({ message: "Something went wrong", error: err.message });
          return res.status(201).json({
            message: "Sign up successfull",
            user: { name: data.name, email: data.email },
          });
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};

// SIGNIN A USER
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Bad Request" });
  } else {
    try {
      let user = await User.findOne({ email });
      if (user) {
        if (user.authenticate(password)) {
          const token = JWT.sign({ id: user._id }, process.env.SECRET);
          const { name, email } = user;
          return res.status(201).json({
            token,
            user: { name, email },
          });
        } else {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  }
};
