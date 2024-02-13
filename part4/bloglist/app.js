const config = require("./utils/config"); // just added
const express = require("express"); // app.js
require("express-async-errors");
const app = express(); // app.js
const cors = require("cors");
const blogsRouter = require("./controllers/blogs"); // just added
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose"); // app.js (got from original index.js)
const logger = require("./utils/logger"); // just added
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    //app.js
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors()); // app.js
app.use(express.static("dist")); // app.js
app.use(express.json()); // app.js
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
