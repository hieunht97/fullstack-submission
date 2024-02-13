import Blog from "../components/Blog";
import { useDispatch } from "react-redux";
import { removeBlog, likeBlog } from "../reducers/blogReducer";
import {
  setErrorNotification,
  setNotification,
} from "../reducers/notificationReducer";

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch();

  const delBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    console.log(blog);
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    dispatch(removeBlog(id));
  };

  const addLike = (id, blogObject) => {
    console.log(id);
    dispatch(likeBlog(id, blogObject));
  };

  return (
    <div>
      <h2>Top blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={() => delBlog(blog.id)}
          user={blog.user}
          addLike={addLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
