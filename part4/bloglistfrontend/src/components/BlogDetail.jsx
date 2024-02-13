import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, newComment } from "../reducers/blogReducer";

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (blog) {
      setLike(blog.likes);
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

  const addLike = (id, blogObject) => {
    console.log(id);
    dispatch(likeBlog(id, blogObject));
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

  const commentForm = () => {
    const addComment = (event) => {
      event.preventDefault();
      const comment = event.target.comment.value;
      const commentObject = { comment: comment };
      dispatch(newComment(blog.id, commentObject));
      event.target.comment.value = "";
    };
    console.log(blog.id);

    return (
      <div>
        <form onSubmit={addComment}>
          <input id="comment" name="comment" placeholder="add a new comment" />
          <button>add comment</button>
        </form>
      </div>
    );
  };

  if (!blog) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      Url: <Link to={blog.url}>{blog.url}</Link> <br />
      {blog.likes} likes <button onClick={updateLike}>like</button>
      <br />
      added by {userName}
      <h2>comments</h2>
      {commentForm()}{" "}
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment._id}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogDetail;
