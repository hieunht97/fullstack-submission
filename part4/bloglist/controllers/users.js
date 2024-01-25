const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password == "") {
    return response.status(400).json({ error: "missing password" });
  } else if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be longer than 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

usersRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs");
  response.json(result).status(200);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs");
  response.json(user).status(200);
});

module.exports = usersRouter;
