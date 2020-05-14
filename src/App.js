import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";

import Strollers from "./views/Strollers";
import AddStrollers from "./views/AddStroller";
import UpdateStroller from "./views/UpdateStroller";
import Header from "./components/Header";

function App() {
  return (
      <div className="App">
        <Header/>
        <Switch>
        <div className="Comparator">
          <Route exact path="/" component={Strollers} />
          <Route exact path="/add" component={AddStrollers} />
          <Route exact path="/update" component={UpdateStroller} />
          </div>
        </Switch>
        <Link to="/add"> Add</Link> <br />
        <Link to="/update"> Update</Link>
      </div>
  );
}

export default App;
