

const userService = require("../services/userService");
const UserValidator = require("../validators/userValidator");

exports.register = async (req, res) => {
  try {
    await UserValidator.registerUserValidator(req.body);
    const data = await userService.registerUser(req.body);
    res.json({ data, message: "Company registered successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Internal Server Error
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
};

exports.login = async (req, res) => {
  try {
    await UserValidator.loginuserValidator(req.body);
    const token = await userService.loginUser(req.body);

    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // Internal Server Error
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message });
  }
};


