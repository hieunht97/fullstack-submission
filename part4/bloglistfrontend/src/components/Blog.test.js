import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

// test 1
test("renders blogs' title and author, but not URL and likes", () => {
  const blog = {
    title: "This is a new blog",
    author: "Hieu Tran",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("This is a new blog - Hieu Tran");
  const element2 = screen.queryByText("Likes: 0", { exact: true });
  expect(element).toBeDefined();
  expect(element2).toBeNull();
});

// test 2
test("checks blog's details, visible if show button is clicked", async () => {
  const blog = {
    title: "This is a new blog",
    author: "Hieu Tran",
    likes: 1283,
  };
  const user = "Hieu Tran";
  const { container } = render(<Blog blog={blog} user={user} />);

  const userEv = userEvent.setup();
  const button = screen.getByText("view");
  await userEv.click(button);
  console.log(container.innerHTML);

  const div = container.querySelector(".blogDetail");

  expect(div).not.toHaveStyle("display: none");
});

// test 3
test("ensures that the like button is clicked twice", async () => {
  const blog = {
    title: "This is a new blog",
    author: "Hieu Tran",
    likes: 1283,
  };
  const user = "Hieu Tran";
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} user={user} addLike={mockHandler} />
  );

  const userEv = userEvent.setup();
  const button = screen.getByText("like");
  await userEv.click(button);
  await userEv.click(button);
  console.log(container.innerHTML);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

// test 4
test("test blog form", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);
  const titleInput = screen.getByPlaceholderText("enter title");
  const authorInput = screen.getByPlaceholderText("enter author");
  const likeInput = screen.getByPlaceholderText("enter likes");
  const sendButton = screen.getByText("add");

  await user.type(titleInput, "Testing blog");
  await user.type(authorInput, "Hieu Tran");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe("Hieu Tran");
});
