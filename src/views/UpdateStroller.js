import React, { Component } from "react";
import apiClient from "../services/Strollers.js";
import "../styles/update/update.css";

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
      toUpdate: this.state.strollers.filter(toUpdate)[0],
    });
  };

  renderStroller = () => {
    const selectedStroller = this.state.toUpdate;
    if (selectedStroller !== undefined) {
      let updateForm = Object.entries(selectedStroller).map(
        ([key, value], index) => {
          if (key !== "_id" && key !== "__v") {
            return (
              <div key={index}>
                <label>{key}</label>
                <input
                  className="Inputs"
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) => {
                    this.setState({
                      toUpdate: Object.assign(this.state.toUpdate, {
                        [e.target.name]: e.target.value,
                      }),
                    });
                  }}
                ></input>
              </div>
            );
          } else {
            return false;
          }
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
    const {auth} = this.props;
    if(auth){
      
    } else {console.log("pute")}

    return (
      <div>
        <div className="Update">
          <h2>Choose a Stroller to update:</h2>
          <select onChange={this.strollerToUpdate}>
            {this.generateList()}
          </select>
          <div className="Form">{this.renderStroller()}</div>
          <input
            className="Submit-button"
            type="submit"
            value="Update"
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
