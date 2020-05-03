import React, { Component } from "react";
import apiClient from "../services/strollers.js";

export default class addStrollers extends Component {
  state = {
    name: "",
    brand: "",
    weight: "",
    storage: "",
    handle: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { name, brand, weight, storage, handle } = this.state;
    apiClient
      .createStroller({ name, brand, weight, storage, handle })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={this.handleChange}
          />
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={this.handleChange}
          />
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={this.handleChange}
          />
          <label>Storage</label>
          <input
            type="number"
            name="storage"
            placeholder="Storage"
            onChange={this.handleChange}
          />
          <label>Handle</label>
          <input
            type="text"
            name="handle"
            placeholder="Handle"
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
