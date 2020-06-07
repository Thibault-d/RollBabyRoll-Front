import React, { Component } from "react";
import apiClient from "../services/Strollers";
import "../styles/detail/detail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../components/Notification"

export default class DeleteStroller extends Component {
  state = {
    strollers: [],
    toDelete: {},
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

  strollerToDelete = (e) => {
    function toDelete(item) {
      return item.name === e.target.value;
    }
    this.setState({
      toDelete: this.state.strollers.filter(toDelete)[0],
    });
  };

  generateList = () => {
    return this.state.strollers.map((item, index) => {
      return (
        <option key={index} value={item.name}>
          {item.brand} - {item.name}
        </option>
      );
    });
  };

  handleClick = () => {
    let toDelete = this.state.toDelete;
    apiClient
      .deleteStroller(toDelete._id)
      .then(() => {
        this.loadStrollers();
        toast.success('Deletion successful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="Delete-Container">
        <h2>Choose a Stroller to delete:</h2>
        <select onChange={this.strollerToDelete}>{this.generateList()}</select>
        <input
          className="Submit-button"
          type="submit"
          value="Delete"
          onClick={this.handleClick}
        />
        <Notification/>
      </div>
    );
  }
}
