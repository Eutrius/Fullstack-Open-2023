const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((res, blog) => {
    return res + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs.reduce((fav, blog) => {
    return fav.likes < blog.likes ? blog : fav;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authors = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .value();

  return _.maxBy(authors, "blogs");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
