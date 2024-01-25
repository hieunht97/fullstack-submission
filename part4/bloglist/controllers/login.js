const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

loginRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    const usersWithTokens = users.map((user) => {
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
      });
      return { username: user.username, token };
    });
    response.json(usersWithTokens);
  } catch (error) {
    response.status(500).json(error.message);
  }
});

module.exports = loginRouter;
