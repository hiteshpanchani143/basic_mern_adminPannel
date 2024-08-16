const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).send({ msg: "welcome to home page" });
  } catch (error) {
    console.log({ msg: "error in home page", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    console.log(req.body);
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ msg: "email already exits" });
    }

    // const saltRound = await bcrypt.genSalt(10)
    // const hashPassword =await bcrypt.hash(password,10); // you can directly write 10 salt

    // Note : hashPassword process in userModel.
    const user = await User.create({
      username,
      email,
      // password: hashPassword,
      password,
      phone,
    });
    res.status(201).send({ msg: "welcome to register page", user });
  } catch (error) {
    res.status(400).send({ msg: "error in register", error: error.message });
  }
};

module.exports = { home, register };
