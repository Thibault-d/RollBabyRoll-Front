import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

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
        <div key={index} className="Stroller-card">
          <p>{item.name}</p>
          <p>{item.weight} kg</p>
          <p>{item.storage} L</p>
          <p>{item.handle}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="App-header">
        <div className="Stroller-container">{this.renderStrollers()}</div>
      </div>
    );
  }
}
