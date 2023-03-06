const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user");

const registerUser = async (userData) => {
  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const mobileNumber = userData.mobile_number;
  const userEmail = userData.email;
  const mobileCheck = await User.find({ mobile_number: mobileNumber });

  if (mobileCheck.length > 0) {
    throw new Error("Mobile number already exists");
  }
  const emailCheck = await User.find({ email: userEmail });

  if (emailCheck.length > 0) {
    throw new Error("Email already registered");
  }

  const newuser = new User({
    name: userData.name,
    isAdmin: userData.isAdmin,
    email: userEmail,
    mobile_number: mobileNumber,
    password: hashedPassword,
  });

  return await newuser.save();
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  function generateToken(user) {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "30d",
    });
    return token;
  }

  const token = generateToken(user);
  user.loggedIn = true;
  await user.save();
  return token;
};

const logoutuser = async (userId) => {
  await user.findByIdAndUpdate(
    { _id: userId },
    { loggedIn: false },
    { new: true }
  );
};

module.exports = {
  registerUser,
  logoutuser,
  loginUser,
};
