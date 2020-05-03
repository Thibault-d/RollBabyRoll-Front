import React, { Component } from "react";
import Strollers from "./views/Strollers";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import AddStrollers from "./views/AddStroller";
import UpdateStroller from "./views/UpdateStroller";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Link to="/add"> Add</Link> <br/>
        <Link to="/update"> Update</Link>

        <Switch>
          <Route exact path="/" component={Strollers} />
          <Route exact path="/add" component={AddStrollers} />
          <Route exact path="/update" component={UpdateStroller} />
        </Switch>
      </div>
    );
  }
}

export default App;
