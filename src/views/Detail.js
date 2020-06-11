import React, { Component } from "react";
import apiClient from "../services/Strollers";
import "../styles/detail/detail.css";

class Detail extends Component {
  state = {
    stroller: undefined,
  };

  loadStrollers = () => {
    let id = this.props.match.params.id.replace(":", "");
    apiClient
      .getOneStroller(id)
      .then((response) => {
        this.setState(
          {
            stroller: [response.data],
          });
      })
      .catch((err) => {
        console.log("Api call error", err);
      });
  };

  componentDidMount() {
    this.loadStrollers();
  }

  renderStroller = () => {
    const stroller = this.state.stroller;
    if (stroller !== undefined) {
      return stroller.map((item, index) => {
        return (
          <div key={index} className="Stroller-detail">
            <img
              className="Stroller-image"
              src={item.image}
              alt={item.name}
            ></img>

            <div className="Flex-row">
              <div className="Main-description">
                <img className="Logo-detail" src="./info.png" alt="info" />
                <div className="Flex-column">
                  <div>Brand: </div>
                  <div>Model: </div>
                  <div>Price: </div>
                  <div>Newborn: </div>
                  <div>Handle: </div>
                  <div>Double: </div>
                </div>
                <div className="Flex-column">
                  <div>{item.brand}</div>
                  <div>{item.name}</div>
                  <div>{item.pricerange}</div>
                  <div>{item.birth}</div>
                  <div>{item.handle}</div>
                  <div>{item.double}</div>
                </div>
              </div>

              <div className="Main-description">
                <img className="Logo-detail" src="./exercise.png" alt="info" />
                <div className="Flex-column">
                  <div>Weight: </div>
                  <div>Folded: </div>
  
                  <div>Max weigth: </div>
                </div>
                <div className="Flex-column">
                  <div>{item.weight} kg</div>
                  <div>{item.dimensionsfolded}</div>

                  <div>{item.maxweight} kg</div>
                </div>
              </div>
              <div className="Main-description">
                <img className="Logo-detail" src="./lifestyle.png" alt="info" />
                <div className="Flex-column">
                  <div>Airplane: </div>
                  <div>All terrain: </div>
                  <div>Sport: </div>
                  <div>Suspension: </div>
                </div>
                <div className="Flex-column">
                  <div>{item.airline}</div>
                  <div>{item.allterrain}</div>
                  <div>{item.sport} </div>
                  <div>{item.suspensions}</div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return <div> {this.renderStroller()}</div>;
  }
}

export default Detail;
