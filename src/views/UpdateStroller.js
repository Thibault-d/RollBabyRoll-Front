import React, { Component } from "react";
import apiClient from "../services/strollers.js";

export default class UpdateStroller extends Component {
  state = {
    strollers: [],
    toUpdate: [],
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

  render() {
    let props = this.props;
    let theme = this.context;
    console.log("props", props)
    console.log("theme", theme)
    return (
      <div>
        <label htmlFor="cars">Choose a car:</label>
        <select id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    );
  }
}