import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class UpdateStroller extends Component {
  state = {
    strollers: [],
    toUpdate: [],
    updated: [],
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
        <option key={index} value={item.name} lol={item._id}>
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
    let selectedStroller = this.state.toUpdate;
    if (selectedStroller.length === 1) {
      let updateForm = Object.entries(selectedStroller[0]).map(
        ([key, value], index) => {
          return (
            <div key={index}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => {
                  this.setState({
                    updated: {...this.state.updated,[e.target.name]:e.target.value}
                  });
                  console.log(this.state.updated)
                }}
              ></input>
            </div>
          );
        }
      );

      return updateForm;
    } else {
      console.log("No stroller selected");
    }
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="strollers">Choose a Stroller to update:</label>
          <select onChange={this.strollerToUpdate}>
            {this.generateList()}
          </select>

            {this.renderStroller()}
            <input type="submit" value="Update" />

        </div>
      </div>
    );
  }
}
