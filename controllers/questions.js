const Question = require("../models/Question");
const User = require("../models/User");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({}).sort("createdAt");

  res.status(StatusCodes.OK).json({ questions, count: questions.length });
};

const getQuestion = async (req, res) => {
  const question = await Question.findOne({ _id: req.params.id });

  res.status(StatusCodes.OK).json({ question });
};

const createQuestion = async (req, res) => {
  const username = req.user.username;

  const user = await User.findOne({ username });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (!user.isAdmin) {
    throw new UnauthenticatedError("User is not an admin");
  }

  req.body.createdBy = req.user.userId;

  const question = await Question.create(req.body);

  res.status(StatusCodes.CREATED).json({ question });
};

const deleteQuestion = async (req, res) => {
  const username = req.user.username;

  const user = await User.findOne({ username });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (!user.isAdmin) {
    throw new UnauthenticatedError("User is not an admin");
  }

  const question = await Question.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!question) {
    throw new BadRequestError(`No question found with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).send();
};

const updateQuestion = async (req, res) => {
  const username = req.user.username;

  const user = await User.findOne({ username });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (!user.isAdmin) {
    throw new UnauthenticatedError("User is not an admin");
  }

  const question = await Question.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!question) {
    throw new BadRequestError(`No question found with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ question });
};

module.exports = {
  getAllQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
