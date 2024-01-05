const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const updateQuestionAttempt = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new BadRequestError(`No user found with id: ${req.params.id}`);
  }

  const data = req.body;

  if (data.password || data.email) {
    throw new UnauthenticatedError("Not authenticated to change these feilds");
  }

  res.status(StatusCodes.OK).json({ user });
};

module.exports = { updateQuestionAttempt };
