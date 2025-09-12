require("dotenv").config();

const express = require("express");
const app = express();

const notFoundMiddleWare = require("./middleware/notFound");
const errorHandlerMiddleWare = require("./middleware/errorHandler");

const connectDB = require("./db/connect");

const taskRouter = require("./router/task");
const usersRouter = require("./router/users");

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/users/", usersRouter);
app.use("/api/v1/tasks/", taskRouter);

// middleware
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    app.listen(port, () => {
      console.log(`server running on port ${port}................`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
