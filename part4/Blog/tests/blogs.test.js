const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("HTTP GET", () => {
  test("blogs in correct amount returned in JSON", async () => {
    const response = await api.get("/api/blogs");

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/application\/json/);
    expect(response.body).toHaveLength(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
