import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class UpdateStroller extends Component {
  state = {
    strollers: [],
    toUpdate: [],
  };

  componentDidMount() {
    this.loadStrollers();
  }

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

  generateList = () => {
    return this.state.strollers.map((item, index) => {
      return (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      );
    });
  };

  strollerToUpdate = (e) => {
    function toUpdate(item) {
      return item.name === e.target.value;
    }
    this.setState({
      toUpdate: this.state.strollers.filter(toUpdate),
    });
  };

  renderStroller = () => {
    if(this.state.toUpdate.length ===1){
    return Object.keys(this.state.toUpdate[0]).map((item, index) => {
      return <div key={index}>{item}</div>;
    });}
    else{console.log("nope")}
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="strollers">Choose a Stroller to update:</label>
          <select onChange={this.strollerToUpdate} id="strollers">
            {this.generateList()}
          </select>
          {this.renderStroller()}
        </div>
      </div>
    );
  }
}
