import React, { Component } from "react";
import * as firebase from 'firebase'
import "../styles/header/header.css";
import { Link } from "react-router-dom";

class Header extends Component {

  adminMenu = () => {
    const { user, signOut} = this.props;
    return (
      <div className="Menu">
        <div>Hello, {user.displayName}</div>
        <Link className="Link" to="/">  Home  </Link>
        <Link className="Link" to="/add">  Add  </Link>
        <Link className="Link" to="/update">   Update   </Link>
        <Link className="Link" to="/" onClick={signOut}> Sign Out</Link>
      </div>
    );
  };
  
  userMenu = () => {
    const  {signInWithGoogle } = this.props;
    return (
      <div className="Menu">
        <Link className="Link" to="/" onClick={signInWithGoogle}> Admin Space</Link>
      </div>
    );
  };



  render() {
    const { user} = this.props;
    return (
      <div className="Header-container">
        <div className="Logo">Roll Baby Roll</div>
        {user ? this.adminMenu() : this.userMenu()}
      </div>
    );
  }
}
export default Header;
