const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const api = supertest(app);

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("demo", 10);
  const user = new User({ username: "demo", passwordHash });

  await user.save();
  const token = await api
    .post("/api/login")
    .send({ username: "demo", password: "demo" });
  console.log(token);
});

describe("User creation", () => {
  test("a user with a valid username can be created", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "demo1",
      name: "demo",
      password: "demo",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await usersInDb();
    expect(usersAfter.length).toBe(usersAtStart.length + 1);

    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("a user cannot be created with an already existing username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "demo",
      password: "demo",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    expect(response.body.error).toContain("expected `username` to be unique");

    const usersAfter = await usersInDb();
    expect(usersAfter.length).toBe(usersAtStart.length);
  });

  test("a user cannot be created with a username or password fewer than 3 characters", async () => {
    const usersAtStart = await usersInDb();
    const statusMessage =
      "Both Username and Password must be at least 3 Characters long";

    const invalidUser = {
      username: "de",
      password: "demo",
    };

    const res1 = await api.post("/api/users").send(invalidUser).expect(400);
    expect(res1.body.error).toContain(statusMessage);

    const invalidPass = {
      username: "demo2",
      password: "de",
    };

    const res2 = await api.post("/api/users").send(invalidPass).expect(400);
    expect(res2.body.error).toContain(statusMessage);

    const usersAfter = await usersInDb();
    expect(usersAfter.length).toBe(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
