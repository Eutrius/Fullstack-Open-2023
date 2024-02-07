const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { userExtractor, blogExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate([
    { path: "user", select: ["name", "username"] },
    { path: "comments", select: "text" },
  ]);
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
    await savedBlog.populate("user", { username: 1, name: 1 });

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!body.text) {
    response.status(400).json({ error: "Comment is required" });
  } else {
    const comment = new Comment({
      ...body,
      blog: blog.id,
    });

    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(comment);
    await blog.save();
    response.status(201).json(savedComment);
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

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
    },
  );
  await updatedBlog.populate([
    { path: "user", select: ["name", "username"] },
    { path: "comments", select: "text" },
  ]);
  response.json(updatedBlog);
});
module.exports = blogsRouter;
