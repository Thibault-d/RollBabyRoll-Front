import React, { Component } from "react";
import apiClient from "../services/Strollers";

class Detail extends Component {
  state = {
    stroller: {},
  };

  loadStrollers = () => {
    let id = this.props.match.params.id.replace(":", "");
    apiClient
      .getOneStroller(id)
      .then((response) => {
        this.setState({
          stroller: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadStrollers();
  }

  renderStroller = () => {
    const stroller = this.state.stroller;
    if (stroller !== undefined) {
      let strollerToShow = Object.entries(stroller).map(
        ([key, value], index) => {
          if (key !== "_id" && key !== "__v") {
            return (
              <div key={index}>
                <div>{key}</div>
                <div>{value}</div>
              </div>
            );
          } else {
            return false;
          }
        }
      );
      return strollerToShow;
    }
  };

  render() {
    return <div> {this.renderStroller()}</div>;
  }
}

export default Detail;
