import React, { useEffect, useState } from "react";

import BlogPreview from "../../components/BlogPreview";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchAbort = new AbortController();

    setTimeout(() => {
      fetch("http://localhost:5000/posts", { signal: fetchAbort.signal })
        .then((respone) => {
          return respone.json();
        })
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(true);
            setLoading(false);
          }
        });
    }, 700);
    return () => fetchAbort.abort();
  }, []);

  return (
    <div className="content">
      <div className="Home">
        <h1>All Posts</h1>
        {loading && <div style={{ margin: "25px" }}>content loading ...</div>}
        {isError && (
          <div style={{ margin: "25px", color: "red" }}>
            Something went wrong ...
          </div>
        )}
        {(posts.length === 0 && !loading) && <div style={{ margin: "25px" }}>No post availabe</div> }
        {posts &&
          posts.map((post) => (
            <BlogPreview
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              author={post.author}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
