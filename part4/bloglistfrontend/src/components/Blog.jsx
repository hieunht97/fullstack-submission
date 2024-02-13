import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, deleteBlog, addLike }) => {
  const [visible, setVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [like, setLike] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (blog) {
      fetchUser(blog.user);
    }
  }, [blog]);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserName(userData.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateLike = async (event) => {
    event.preventDefault();
    setLike((like) => {
      const updatedLike = like + 1;
      addLike(blog.id, {
        title: blog.title,
        author: blog.author,
        likes: updatedLike,
        url: blog.url,
      });
      return updatedLike;
    });
  };

  const updateUnlike = async (event) => {
    event.preventDefault();
    setLike((like) => {
      const updatedLike = like - 1;
      addLike(blog.id, {
        title: blog.title,
        author: blog.author,
        likes: updatedLike,
        url: blog.url,
      });
      return updatedLike;
    });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogPost">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>{" "}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <div style={showWhenVisible} className="blogDetail">
        Likes: {blog.likes}{" "}
        {buttonVisible ? (
          <button onClick={updateLike}>like</button>
        ) : (
          <button onClick={updateUnlike}>unlike</button>
        )}
        <br />
        Url: <Link to={blog.url}>{blog.url}</Link>
        <br /> Posted by {userName}
        <br /> <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
