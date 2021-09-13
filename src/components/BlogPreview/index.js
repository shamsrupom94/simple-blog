import React from "react";
import { Link } from "react-router-dom";

const BlogPreview = ({ title, body, author, id }) => {
  return (
    <div className="blog-preview">
      <Link to={`blog/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>
        {body.substring(0, 150)}....<Link to={`blog/${id}`}>(read more)</Link>
      </p>
      <p className="author-name">Written By {author}</p>
    </div>
  );
};

export default BlogPreview;
