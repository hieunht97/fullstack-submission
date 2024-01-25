import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newLikes, setNewLikes] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
    });
    setNewAuthor("");
    setNewTitle("");
    setNewLikes("");
  };

  return (
    <div>
      <h2>Add more blogs</h2>
      <form onSubmit={addBlog}>
        <div>
          Blog title:{" "}
          <input
            id="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="enter title"
          />
        </div>
        <div>
          Author:{" "}
          <input
            id="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder="enter author"
          />
        </div>
        <div>
          Likes:{" "}
          <input
            id="likes"
            value={newLikes}
            onChange={(event) => setNewLikes(event.target.value)}
            placeholder="enter likes"
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default BlogForm;
