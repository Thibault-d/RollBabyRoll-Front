import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "../styles/protected/protected.css";
import Strollers from "../views/Strollers";
import { render } from "@testing-library/react";

export default class Protected extends Component {

  render() {
    return (
      <div className="Protected">
        <h2>Oops, this feature is protected!</h2>
        <img alt="Protected" src="./security.png"></img>
        <p>To access the edition features, you must be an Admin.</p>
        <Link className="Return-home" to="/"> Return to Home </Link>

        <Switch>
            <Route
              exact
              path="/"
              component={ <Strollers/>}
            />
          </Switch>
      </div>
    );
  }
}
