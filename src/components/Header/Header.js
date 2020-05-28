import React, { Component } from "react";
import "../../styles/header/header.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="Header-container">
        <div className="Logo">Roll Baby Roll</div>
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
