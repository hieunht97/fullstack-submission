const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (sum, blog) {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((mostLikedBlog, currentBlog) => {
    return mostLikedBlog.likes > currentBlog.likes
      ? mostLikedBlog
      : currentBlog;
  }, blogs[0]);

  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const countBlog = _.countBy(blogs, "author");
  const authorWithMostBlogs = _.maxBy(
    Object.keys(countBlog),
    (author) => countBlog[author]
  );
  console.log(countBlog);
  return {
    author: authorWithMostBlogs,
    blogs: countBlog[authorWithMostBlogs],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
