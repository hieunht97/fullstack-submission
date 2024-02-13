import { useState } from "react";
import { newBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    const likes = event.target.likes.value;
    dispatch(newBlog({ title, author, likes, url }));
    dispatch(setNotification("you created a new note"));
  };

  return (
    <div>
      <h2>Add more blogs</h2>
      <form onSubmit={addBlog}>
        <div>
          Blog title:{" "}
          <input id="title" name="title" placeholder="enter title" />
        </div>
        <div>
          Author: <input id="author" name="author" placeholder="enter author" />
        </div>
        <div>
          Url: <input id="url" name="url" placeholder="enter URL" />
        </div>
        <div>
          Likes: <input id="likes" name="likes" placeholder="enter likes" />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default BlogForm;
