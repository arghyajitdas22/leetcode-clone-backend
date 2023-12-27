const {
  getAllQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questions");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllQuestions).post(createQuestion);
router
  .route("/:id")
  .get(getQuestion)
  .delete(deleteQuestion)
  .patch(updateQuestion);

module.exports = router;
