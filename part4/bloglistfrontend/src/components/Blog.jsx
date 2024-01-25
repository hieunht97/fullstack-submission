import { useState } from "react";

const Blog = ({ blog, deleteBlog, user, addLike }) => {
  const [visible, setVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [like, setLike] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

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
      });
      return updatedLike;
    });
    // setButtonVisible(!buttonVisible);
  };

  const updateUnlike = async (event) => {
    event.preventDefault();
    setLike((like) => {
      const updatedLike = like - 1;
      addLike(blog.id, {
        title: blog.title,
        author: blog.author,
        likes: updatedLike,
      });
      return updatedLike;
    });
    // setButtonVisible(!buttonVisible);
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
      {blog.title} - {blog.author}{" "}
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
        <br /> Posted by {user}
        <br /> <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
