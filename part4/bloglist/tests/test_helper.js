const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "lets do another test 2 3 4 5",
    author: "okay con cho",
    likes: 0,
    user: "659f6a56eb6fba5fe4ef2ac9",
    id: "659f6eb7b3f9bbeb499588ac",
  },
  {
    title: "blog cho dan le 2",
    author: "dan le viet blog 2",
    likes: 0,
    user: "659f6ad0eb6fba5fe4ef2acd",
    id: "659f6f5bc6d5e2d9f94dc858",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  blogsInDb,
  usersInDb,
  initialBlogs,
};
