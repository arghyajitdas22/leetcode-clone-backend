const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //check password

  const isCorrectPassword = await user.comparePasswords(password);

  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

const checkUserSession = async (req, res) => {
  const { token } = req.body;

  let msg;

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      // console.log(0);
      msg = "token expired";
    } else {
      // console.log(1);
      msg = "token active";
    }
  });

  res.status(StatusCodes.OK).json({ message: msg });
};

module.exports = {
  registerUser,
  loginUser,
  checkUserSession,
};
