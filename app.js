require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/error-handler");
const auththenticationMiddleware = require("./middlewares/authentication");

const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const questionRouer = require("./routes/questions");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I will make leetcode backend on my own");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", auththenticationMiddleware, questionRouer);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
