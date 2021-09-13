import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [charecters, setCharecters] = useState(0);
  const [lengthError, setLengthError] = useState(false);
  const [posting, setPosting] = useState(false);
  const history = useHistory();

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const bodyOnChange = (e) => {
    setBody(e.target.value);
    setCharecters(e.target.value.length);
    setLengthError(false);
  };

  const authorOnChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charecters < 100) {
      setLengthError(true);
      return;
    }
    let blogPost = {
      title,
      body,
      author,
    };
    setPosting(true);
    setTimeout(() => {
      fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPost),
      }).then(() => {
        console.log("Post Added");
        setPosting(true);
        setTitle("");
        setBody("");
        setAuthor("");
        history.push("/");
      });
    }, 500);
  };

  return (
    <div className="content">
      <div className="create">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Post Title</label>
          <input
            value={title}
            onChange={(e) => titleOnChange(e)}
            required
            type="text"
          />
          <label>Post Body</label>
          <textarea
            value={body}
            required
            onChange={(e) => bodyOnChange(e)}
            rows="6"
            type="text"
          />
          {lengthError && (
            <p style={{ fontSize: "12px", color: "red" }}>
              post length must be more than 100 charecters
            </p>
          )}
          <p
            style={{ fontSize: "12px", color: "#CC1BEC" }}
          >{`Total Charecters: ${charecters}`}</p>
          <label>Author</label>
          <input
            value={author}
            required
            onChange={(e) => authorOnChange(e)}
            type="text"
          />
          {!posting && <button>Post Content</button>}
          {posting && <button disabled>Posting Content......</button>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
