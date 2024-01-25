import { useEffect, useState } from "react";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((response) => {
        if (Array.isArray(response)) {
          response.sort(
            (firstItem, secondItem) => secondItem.likes - firstItem.likes
          );
          setBlogs(response);
        } else if (typeof response === "object" && response !== null) {
          setBlogs([response]);
        }
      });
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(`Added ${blogObject.title} by ${blogObject.author}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const addLike = (id, blogObject) => {
    console.log(id);
    blogService.updateBlog(id, blogObject).then((updatedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
    });
  };

  const delBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    console.log(blog);
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmed) {
      blogService.deleteBlog(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      window.location.href = "/";
      // history.push("/");
    } catch (exception) {
      setErrorMessage("Wrong credential");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.href = "/";
  };

  const loginForm = () => {
    if (user === null) {
      return (
        <form onSubmit={handleLogin}>
          <div>
            <h1>Login to access your blogs</h1>
            username:{" "}
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:{" "}
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button">login</button>
        </form>
      );
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" hideButtonLabel="hide">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={message} errorMessage={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          {" "}
          Welcome, {user.name}! <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <h2>Top blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={() => delBlog(blog.id)}
              user={user.name}
              addLike={addLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
