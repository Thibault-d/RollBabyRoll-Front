import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";

import Strollers from "./views/Strollers";
import AddStrollers from "./views/AddStroller";
import UpdateStroller from "./views/UpdateStroller";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Comparator">
        <Switch>
          <Route exact path="/" component={Strollers} />
          <Route exact path="/add" component={AddStrollers} />
          <Route exact path="/update" component={UpdateStroller} />
        </Switch>
      </div>
      <Link to="/add"> Add</Link> <br />
      <Link to="/update"> Update</Link>
    </div>
  );
}

export default App;
