require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const notFoundMiddleWare = require("./middleware/notFound");
const errorHandlerMiddleWare = require("./middleware/errorHandler");

const connectDB = require("./db/connect");

const taskRouter = require("./router/task");
const usersRouter = require("./router/users");
const auth = require("./middleware/authenticationMiddleware");

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://clifford-joshua.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/users", usersRouter);
app.use("/api/v1/tasks", auth, taskRouter);

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
