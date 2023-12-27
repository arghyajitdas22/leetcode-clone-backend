const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema({
  input: {
    type: String,
    required: [true, "Please give example input"],
  },
  output: {
    type: String,
    required: [true, "Please give example output"],
  },
});

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Question title"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please elaborate the question"],
    },
    status: {
      type: String,
      enum: ["accepted", "attempted", "unattempted"],
      default: "unattempted",
    },
    solutionUrl: {
      type: String,
    },
    acceptance: {
      type: Number,
      required: [true, "Please give a acceptance rate for the problem"],
    },
    difficulty: {
      type: String,
      required: [true, "State difficulty level of the problem"],
    },
    examples: {
      type: [ExampleSchema],
      required: [true, "Please provide examples"],
    },
    constraints: {
      type: [String],
      required: [true, "Please provide constraints of the problem"],
    },
    customInput: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Please provide a input testcase"],
    },
    customOutput: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Please provide output of the testcase"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an user to create question"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
