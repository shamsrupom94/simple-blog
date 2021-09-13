import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [detailedPost, setDetailedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (JSON.stringify(data) === JSON.stringify({})) {
            setLoading(false);
            setIsError(true);
          } else {
            setLoading(false);
            setDetailedPost(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, [id]);

  const deletePost = () => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  }

  return (
    <div className="content">
      {loading && <div style={{ margin: "30px" }}>content loading ......</div>}
      {isError && (
        <div style={{ margin: "30px", color: "red" }}>
          Something went wrong ......
        </div>
      )}
      {detailedPost !== null && (
        <div className="blog-details">
          <h2>{detailedPost.title}</h2>
          <div>
            <p>{detailedPost.body}</p>
          </div>
          <p className="author-name">Written By {detailedPost.author}</p>
          <br />
          <button onClick={deletePost}>Delete Post</button>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
