import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class addStrollers extends Component {
  state = {
    name: "",
    brand: "",
    weight: "",
    storage: "",
    handle: "",
    dimensions: "",
    maxweight: "",
    brakes: "",
    image: "",
    reversible: "",
    birth: "",
    sport: "",
    double: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      name,
      brand,
      weight,
      storage,
      handle,
      dimensions,
      maxweight,
      brakes,
      image,
      reversible,
      birth,
      sport,
      double,
    } = this.state;
    apiClient
      .createStroller({
        name,
        brand,
        weight,
        storage,
        handle,
        dimensions,
        maxweight,
        brakes,
        image,
        reversible,
        birth,
        sport,
        double,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  inputType = (item) => {
    switch (item) {
      case "weight":
        return "number";
      case "maxweight":
        return "number";
      case "storage":
        return "number";
      default:
        return "text";
    }
  };

  generateForm = () => {
    return Object.keys(this.state).map((item, index) => {
      return (
        <div key={index}>
          <label>{item}</label>
          <input
            type={this.inputType(item)}
            name={item}
            placeholder={item}
            onChange={this.handleChange}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.generateForm()}
          <input type="submit" />
        </form>
      </div>
    );
  }
}
