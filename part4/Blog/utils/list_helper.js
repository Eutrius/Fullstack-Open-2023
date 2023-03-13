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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
