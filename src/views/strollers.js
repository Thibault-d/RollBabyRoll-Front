import React, { Component } from "react";
import apiClient from "../services/strollers.js";

export default class Strollers extends Component {
  state = {
    strollers: [],
  };

  loadStrollers() {
    apiClient
      .getAllStrollers()
      .then(({ data }) => {
        this.setState({
          strollers: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadStrollers();
  }

  renderStrollers = () => {
    return this.state.strollers.map((item, index) => {
      return (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.weight}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="App-header">{this.renderStrollers()}</div>
      </div>
    );
  }
}
