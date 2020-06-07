import React, { Component } from "react";
import apiClient from "../services/Strollers.js";
import "../styles/addstroller/addstroller.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../components/Notification"

export default class addStrollers extends Component {
  state = {
    name: "",
    brand: "",
    weight: "",
    storage: "",
    handle: "",
    allterrain: "",
    airline: "",
    dimensionsfolded: "",
    dimensionsopen:"",
    maxweight: "",
    brakes: "",
    image: "",
    reversible: "",
    birth: "",
    sport: "",
    double: "",
    pricerange: "",
    suspensions: ""
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      brand,
      weight,
      storage,
      handle,
      allterrain,
      airline,
      dimensionsfolded,
      dimensionsopen,
      maxweight,
      brakes,
      image,
      reversible,
      birth,
      sport,
      double,
      pricerange,
      suspensions,
    } = this.state;
    apiClient
      .createStroller({
        name,
        brand,
        weight,
        storage,
        handle,
        allterrain,
        airline,
        dimensionsfolded,
        dimensionsopen,
        maxweight,
        brakes,
        image,
        reversible,
        birth,
        sport,
        double,
        pricerange,
        suspensions,
      })
      .then(
        toast.success('Stroller added correctly', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      )
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
          <label className="Labels">{item}</label>
          <input className="Inputs"
            type={this.inputType(item)}
            step="0.1"
            name={item}
            onChange={this.handleChange}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="Form">
        <h2>Add a new Stroller</h2>
        <form onSubmit={this.handleSubmit}>
          {this.generateForm()}
          <input className="Submit-button" type="submit" value="Add to Database"/>
        </form>
        <Notification/>
      </div>
    );
  }
}
