const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

// Get blogs that match user in database
blogsRouter.get("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const blogs = await Blog.find({ user: user._id });

  response.json(blogs);
});

// Post new blog to database
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    __v: body.__v,
    user: user.id,
  });

  if (body.title) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(blog);
  } else {
    response.status(400).end();
  }
});

// Remove a blog from database
blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;
  const blogIndex = user.blogs.indexOf(request.params.id);

  console.log(blog.user.toString(), user._id.toString());

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    user.blogs.splice(blogIndex, 1);
    await user.save();
    response.status(204).send("blog deleted").end();
  } else {
    response
      .status(400)
      .json({ error: `You don't have permission to delete this blog` });
  }
});

// Update a blog
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog).status(200);
});

module.exports = blogsRouter;
