import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Just a Blog App</h1>
      <Link to="/">Home</Link>
      <Link to="/create">New Post</Link>
    </div>
  );
};

export default Navbar;
