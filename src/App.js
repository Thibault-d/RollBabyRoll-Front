import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Strollers from "./views/Strollers";
import AddStrollers from "./views/AddStroller";
import UpdateStroller from "./views/UpdateStroller";
import DeleteStroller from "./views/DeleteStroller";
import Header from "./components/Header";
import Detail from "./views/Detail";
import Protected from "./views/Protected";

import withFirebaseAuth from "react-with-firebase-auth";
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "./components/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div className="App">
        <Header
          user={user}
          signOut={signOut}
          signInWithGoogle={signInWithGoogle}
        />
        <div className="Comparator">
          <Switch>
            <Route exact path="/" component={() => <Strollers user={user} />} />
            <Route path="/detail:id" component={Detail} />
            <Route
              exact
              path="/add"
              component={() => (user ? <AddStrollers /> : <Protected />)}
            />
            <Route
              exact
              path="/update"
              component={() => (user ? <UpdateStroller /> : <Protected />)}
            />
            <Route
              exact
              path="/delete"
              component={() => (user ? <DeleteStroller /> : <Protected />)}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
