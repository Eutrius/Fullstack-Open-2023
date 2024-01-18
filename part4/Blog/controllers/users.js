const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const minLength = 3;
  if (username.length < minLength || password.length < minLength) {
    response.status(400).send({
      error: "Both Username and Password must be at least 3 Characters long",
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("password", saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
