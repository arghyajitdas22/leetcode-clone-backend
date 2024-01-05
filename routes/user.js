const { updateQuestionAttempt } = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.route("/:id").patch(updateQuestionAttempt);

module.exports = router;
