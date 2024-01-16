const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updateNote) => {
      response.json(updateNote);
    })
    .catch((err) => next(err));
});
module.exports = blogsRouter;
