import UserModel from "../models/UserModel.js";

import jwt from "jsonwebtoken";

// Register new user
export const registerUser = async (req, res) => {
  const newUser = new UserModel(req.body);
  const { email } = req.body;
  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      // const validity = await bcrypt.compare(password, user.password);

      if (user.password !== password) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.email, id: user._id },
          "vamsi"
          //   { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
