import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification, setErrorNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addLike(state, action) {
      const id = action.payload;
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    addComment(state, action) {
      const id = action.payload.id;
      const comment = action.payload.comment;
      return state.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, comment] }
          : blog
      );
    },
  },
});

export const { setBlogs, appendBlog, deleteBlog, addLike, addComment } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    if (Array.isArray(blogs)) {
      blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes);
    }
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch(appendBlog(blog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(id);

    console.log(response);
    if (!response.ok) {
      const error = response.error;
      dispatch(setErrorNotification(error));
    }
    dispatch(deleteBlog(id));
  };
};

export const newComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment);
    dispatch(addComment({ id, comment }));
  };
};

export const likeBlog = (id, content) => {
  return async (dispatch) => {
    await blogService.updateBlog(id, content);
    dispatch(addLike(id));
  };
};

export default blogSlice.reducer;
