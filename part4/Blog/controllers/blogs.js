const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user.id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id) {
    response.status(401).json({ error: "Unauthorized token" });
  }
  await Blog.findByIdAndDelete(blog._id);

  const idFromUserInString = blog._id.toString();
  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== idFromUserInString,
  );

  await user.save();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});
module.exports = blogsRouter;
