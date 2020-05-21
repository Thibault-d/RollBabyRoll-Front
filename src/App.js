import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Strollers from "./views/Strollers";
import AddStrollers from "./views/AddStroller";
import UpdateStroller from "./views/UpdateStroller";
import Header from "./components/Header/Header";
import Detail from "./views/Detail";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="Comparator">
        <Switch>
          <Route exact path="/" component={Strollers} />
          <Route exact path="/add" component={AddStrollers} />
          <Route exact path="/update" component={UpdateStroller} />
          <Route path="/detail:id" component={Detail} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
