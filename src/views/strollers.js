import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class Strollers extends Component {
  state = {
    allStrollers: [],
    filteredStrollers: null,
    filterButtonState: {
      priceButton: "",
    },
    filters: {
      priceFilter: "",
      weightFilter: "",
    },
  };

  loadStrollers() {
    apiClient
      .getAllStrollers()
      .then(({ data }) => {
        this.setState({
          allStrollers: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadStrollers();
  }

  buttonClickHandler = (e) => {
    this.setState(
      {
        filterButtonState: {
          ...this.state.filterButtonState,
          priceButton: e.target.id,
        },
        filters: {
          ...this.state.filters,
          priceFilter: e.target.value,
        },
      },
      () => this.filter()
    );
  };

  buttonColorHandler = (id) => {
    console.log(id, this.state.filterButtonState.priceButton)
    return (id === this.state.filterButtonState.priceButton)
      ? "ActiveButton"
      : "InactiveButton";
  };

  filter = () => {
    this.setState({
      filteredStrollers: this.state.allStrollers.filter(
        (item) => item.pricerange === this.state.filters.priceFilter
      ),
    });
  };

  renderStrollers = () => {
    let listToDisplay = null;
    let { allStrollers, filteredStrollers } = this.state;
    filteredStrollers != null
      ? (listToDisplay = filteredStrollers)
      : (listToDisplay = allStrollers);

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
            <input
              type="button"
              id="1"
              className={this.buttonColorHandler("1")}
              value="€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="2"
              className={this.buttonColorHandler("2")}
              value="€€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="3"
              className={this.buttonColorHandler("3")}
              value="€€€"
              onClick={this.buttonClickHandler}
            />
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
