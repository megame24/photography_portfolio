import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => 
  <div>
    <h1>Welcome</h1>
    <Link to="/admin/login">Login</Link>
  </div>;

export default HomePage;
