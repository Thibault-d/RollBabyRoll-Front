import React, { Component } from "react";
import apiClient from "../services/Strollers.js";


export default class Strollers extends Component {
  state = {
    strollers: [],
    filtered: null,
    priceFilter: {
      color: "",
      price: "",
    },
  };

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

  componentDidMount() {
    this.loadStrollers();
  }

  buttonClick = (e) => {
    this.setState(
      {
        priceFilter: {
          ...this.state.priceFilter,
          price: e.target.value,
          color: "white",
        },
      },
      () => this.filter()
    );
    console.log(this.state.priceFilter);
  };

  filter = () => {
    this.setState({
      filtered: this.state.strollers.filter(
        (item) => item.pricerange === this.state.priceFilter.price
      ),
    });
  };

  renderStrollers = () => {
    let listToDisplay = null;
    let { strollers, filtered } = this.state;
    filtered != null ? (listToDisplay = filtered) : (listToDisplay = strollers);

    return listToDisplay.map((item, index) => {
      return (
        <div key={index} className="Stroller-column">
          <img className="Stroller-img" src={item.image} alt={item.name}></img>
          <div>{item.name}</div>
          <div>{item.brand} </div>
          <div>{item.storage} kg</div>
          <div>{item.handle}</div>
          <div>{item.dimensionsfolded}</div>
          <div>{item.dimensionsopen}</div>
          <div>{item.maxweight} kg</div>
          <div>{item.weight} kg</div>
          <div>{item.brakes}</div>
          <div>{item.reversible}</div>
          <div>{item.birth}</div>
          <div>{item.sport}</div>
          <div>{item.double}</div>
          <div>{item.pricerange}</div>
          <div>{item.suspensions}</div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="App-header">
        <div className="Filter-container">
          <div className="Price-filter">
            Price Range:
            <input type="button" value="€" onClick={this.buttonClick} />
            <input type="button" value="€€" onClick={this.buttonClick} />
            <input type="button" value="€€€" onClick={this.buttonClick} />
          </div>
          <div className="Weight-filter">
            <label> Maximum weight</label>
  
          </div>
        </div>
        <div className="Stroller-container">
          <div>
            <div className="Stroller-img">Image</div>
            <div>Model</div>
            <div>Brand </div>
            <div>Storage</div>
            <div>Handle</div>
            <div>Dimension folded </div>
            <div>Dimension open </div>
            <div>Maximum Weight </div>
            <div>Weight </div>
            <div>Brakes </div>
            <div>Reversible</div>
            <div>Use from birth</div>
            <div>Use for sport </div>
            <div>Double </div>
            <div>Price range</div>
            <div>Suspensions</div>
          </div>
          {this.renderStrollers()}
        </div>
      </div>
    );
  }
}
