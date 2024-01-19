const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const user = require("../models/user");
const { userExtractor, blogExtractor } = require("../utils/middleware");

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
    response.status(400).json({ error: "Title and Url is required" });
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete(
  "/:id",
  userExtractor,
  blogExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = request.blog;
    await Blog.findByIdAndDelete(blog.id);

    const idFromUserInString = blog.id.toString();
    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== idFromUserInString,
    );

    await user.save();
    response.status(204).end();
  },
);

blogsRouter.put(
  "/:id",
  userExtractor,
  blogExtractor,
  async (request, response) => {
    const blog = request.blog;
    const { title, author, url, likes } = request.body;

    const blogUpdate = {
      title,
      author,
      url,
      likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(blog.id, blogUpdate, {
      new: true,
    });
    response.json(updatedBlog);
  },
);
module.exports = blogsRouter;
