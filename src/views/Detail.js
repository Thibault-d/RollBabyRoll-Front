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
      let stroller = this.state.stroller

      let keys = Object.keys(stroller)
      let values = Object.values(stroller)
      
      console.log(keys, values)

  };

  render() {
    return <div> {this.renderStroller()}</div>;
  }
}

export default Detail;
