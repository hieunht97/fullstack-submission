const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");
const Blog = require("../models/blog");

// beforeEach(async () => {
//   await Blog.deleteMany({});
// });

describe("dummy test", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(15);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMoreBlogs);
    expect(result).toBe(36);
  });

  test("find the blog with most likes", () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(listWithMoreBlogs);
    expect(result).toEqual(expectedResult);
  });

  test("test count blog", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(listWithMoreBlogs);
    expect(result).toEqual(expectedResult);
  });
});
