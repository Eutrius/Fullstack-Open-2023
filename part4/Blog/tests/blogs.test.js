const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blogsForTest = require("../utils/blogsForTest.js");

const api = supertest(app);

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

let token;
let initialBlogs;

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("demo", 10);
  const initialUser = new User({ username: "demo", passwordHash });

  initialBlogs = blogsForTest.map((blog) => {
    initialUser.blogs = initialUser.blogs.concat(blog._id);
    return { ...blog, user: initialUser.id };
  });
  await initialUser.save();
  await Blog.insertMany(initialBlogs);

  const userForToken = {
    username: initialUser.username,
    id: initialUser.id,
  };

  token = "Bearer ".concat(jwt.sign(userForToken, process.env.SECRET));
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
  test("a blog cannot be creaeted without a valid token", async () => {
    const newBlog = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
      likes: 99,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAfter = await blogsInDb();

    expect(blogsAfter).toHaveLength(initialBlogs.length);
  });

  test("a blog can be created", async () => {
    const newBlog = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await blogsInDb();

    expect(blogsAfter).toHaveLength(initialBlogs.length + 1);

    const titlesAfter = blogsAfter.map((blog) => blog.title);

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
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await blogsInDb();
    const newBlogInDb = blogsAfter[blogsAfter.length - 1];
    expect(newBlogInDb.likes).toBe(0);
  });

  test("a blog without title or url return 400 bad request", async () => {
    const newBlogWithoutTitle = {
      author: "Fullstack Open",
      url: "https://fullstackopen.com",
      likes: 99,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlogWithoutTitle)
      .expect(400);

    const newBlogWithoutUrl = {
      title: "Create A Fullstack Website",
      author: "Fullstack Open",
      likes: 99,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlogWithoutUrl)
      .expect(400);

    const newBlogWithoutBoth = {
      author: "Fullstack Open",
      likes: 99,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlogWithoutBoth)
      .expect(400);
  });
});

describe("HTTP DELETE", () => {
  test("a blog cannot be deleted without a valid token", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAfter = await blogsInDb();
    expect(blogsAfter).toHaveLength(blogs.length);
  });

  test("a blog can be deleted", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", token)
      .expect(204);

    const blogsAfter = await blogsInDb();
    expect(blogsAfter.length).toBe(blogs.length - 1);
  });
});

describe("HTTP PUT", () => {
  test("a blog cannot be updated without a valid token", async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedLikes = blogToUpdate.likes + 1;
    const updatedTitle = "React Patterns";
    const blog = {
      ...blogToUpdate,
      title: updatedTitle,
      likes: updatedLikes,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(401);

    const blogToUpdateAfter = await Blog.findById(blogToUpdate.id);

    expect(blogToUpdateAfter.title).toMatch(blogToUpdate.title);
    expect(blogToUpdateAfter.likes).toBe(blogToUpdate.likes);
  });
  test("a blog can be updated", async () => {
    const blogs = await blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedLikes = blogToUpdate.likes + 1;
    const updatedTitle = "React Patterns";
    const blog = {
      ...blogToUpdate,
      title: updatedTitle,
      likes: updatedLikes,
    };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", token)
      .send(blog)
      .expect(200);

    const updatedBlog = response.body;

    expect(updatedBlog.likes).toBe(updatedLikes);
    expect(updatedBlog.title).toMatch(updatedTitle);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
