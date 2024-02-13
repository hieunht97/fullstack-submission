import { useEffect } from "react";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/blogDetail";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { Route, Routes, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { userLogin, userLogout } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      console.log(JSON.parse(loggedUserJSON));
      const activeUser = JSON.parse(loggedUserJSON);
      blogService.setToken(activeUser.token);
      dispatch(userLogin(activeUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      blogService.setToken(activeUser.token);
      dispatch(initializeUsers());
      dispatch(initializeBlogs());
    }
  }, [activeUser, dispatch]);

  const blogs = useSelector((state) => state.blog);
  const users = useSelector((state) => state.users);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" hideButtonLabel="hide">
      <BlogForm />
    </Togglable>
  );

  const match = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const padding = {
    padding: 5,
  };

  return (
    <div>
      {activeUser === null && <LoginForm />}
      {activeUser && (
        <div>
          <div className="navigation">
            <Link style={padding} to="/users">
              Users
            </Link>
            <Link style={padding} to="/blogs">
              Blogs
            </Link>
            <a style={padding}>Welcome, {activeUser.name}! </a>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Notification />
          <h1>Blog App</h1>
          {blogForm()}
          <Routes>
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route path="/blogs/:id" element={<BlogDetail blog={blog} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
