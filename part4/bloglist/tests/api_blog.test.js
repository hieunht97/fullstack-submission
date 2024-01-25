const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);
const testUser = {
  username: "testuser",
  password: "testpassword",
};
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

// step 1
test("all blogs are returned", async () => {
  await api.post("/api/users").send(testUser);
  const loginResponse = await api.post("/api/login").send(testUser);
  token = loginResponse.body.token;

  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
  console.log(response.body);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// step 2
test("id is defined", async () => {
  const blogs = await helper.blogsInDb();
  const blogsId = blogs.map((blog) => blog.id);
  expect(blogsId).toBeDefined();
});

// step 3
test("new blog added", async () => {
  await api.post("/api/users").send(testUser);
  const loginResponse = await api.post("/api/login").send(testUser);
  token = loginResponse.body.token;

  const newBlog = {
    title: "Bao Ve Khoi Anh 2 3 4",
    author: "Hieu Tran",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

//step 4
test("likes will auto be 0 if undefined", async () => {
  await api.post("/api/users").send(testUser);
  const loginResponse = await api.post("/api/login").send(testUser);
  token = loginResponse.body.token;

  const newBlog = {
    title: "Bao Ve Khoi Anh 2 3 4",
    author: "Hieu Tran",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);
  console.log(response.body);
  const blogsAtEnd = await helper.blogsInDb();
  const blogToCheck = blogsAtEnd.find((r) => r.id === response.body.id);
  expect(blogToCheck.likes).toBe(0);
});

//step 5
test("return 400 if missing", async () => {
  await api.post("/api/users").send(testUser);
  const loginResponse = await api.post("/api/login").send(testUser);
  token = loginResponse.body.token;

  const newBlog = {
    author: "Hieu Tran",
    url: "https://hieutranresume.com/",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
