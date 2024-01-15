const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog.js");
const blogsForTest = require("../utils/blogsForTest.js");

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogsForTest);
});

describe("HTTP GET", () => {
  test("blogs are returned in JSON", async () => {
    const response = await api.get("/api/blogs");

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(blogsForTest.length);
  });

  test("blogs have a unique property named id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("HTTP POST", () => {
  test("a blog can be created", async () => {
    const newBlog = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await api.get("/api/blogs");

    expect(blogsAfter.body).toHaveLength(blogsForTest.length + 1);

    const titlesAfter = blogsAfter.body.map((blog) => blog.title);

    expect(titlesAfter).toContain("Create A Fullstack Website");
  });

  test("a blog can be created without likes property", async () => {
    const newBlog = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await api.get("/api/blogs");
    const newBlogInDb = blogsAfter.body[blogsAfter.body.length - 1];
    expect(newBlogInDb.likes).toBe(0);
  });

  test("a blog without title or url return 400 bad request", async () => {
    const newBlogWithoutTitle = {
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
      likes: 99,
    };
    await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);

    const newBlogWithoutUrl = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      likes: 99,
    };
    await api.post("/api/blogs").send(newBlogWithoutUrl).expect(400);

    const newBlogWithoutBoth = {
      author: "Fullstack Open",
      likes: 99,
    };
    await api.post("/api/blogs").send(newBlogWithoutBoth).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
