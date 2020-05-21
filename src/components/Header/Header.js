import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="Header-container">
        <img src="../../../logo-2.png" alt="logo"></img>
        <p>Your baby, your criteria!</p>
        <div className="Menu">
        <Link className="Link" to="/"> Home</Link>
          <Link className="Link" to="/add"> Add</Link>
          <Link className="Link" to="/update"> Update</Link>
        </div>
      </div>
    );
  }
}
export default Header;
