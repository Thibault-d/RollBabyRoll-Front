import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class UpdateStroller extends Component {
  state = {
    strollers: [],
    toUpdate: {},
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
      toUpdate: this.state.strollers.filter(toUpdate)[0],
    });
  };

  renderStroller = () => {
    const selectedStroller = this.state.toUpdate;
    if (selectedStroller !== undefined) {
      let updateForm = Object.entries(selectedStroller).map(
        ([key, value], index) => {
          return (
            <div key={index}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => {
                  this.setState(
                    {
                      toUpdate: Object.assign(this.state.toUpdate, {
                        [e.target.name]: e.target.value,
                      }),
                    },
                    () => {
                      console.log(this.state.toUpdate);
                    }
                  );
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

  handleClick = () => {
    apiClient
      .updateStroller(this.state.toUpdate)
      .then((data) => {
        console.log("Stroller Updated", data.name);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <input type="submit" value="Update" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}
