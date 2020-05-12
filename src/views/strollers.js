import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class Strollers extends Component {
  state = {
    allStrollers: [],
    filteredStrollers: null,
    priceFilters: [],
    birthFilter: [null, null],
    weightFilter: 20,
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
    let { id, name } = e.target;
    let buttonStatus = this.state.priceFilters;
    buttonStatus[id] === name
      ? (buttonStatus[id] = null)
      : (buttonStatus[id] = name);
    this.forceUpdate();
    this.filter();
  };

  buttonColorHandler = (id, name) => {
    let string = "";
    let buttonStatus = this.state.priceFilters;
    buttonStatus[id] === name
      ? (string = "ActiveButton")
      : (string = "InactiveButton");
    return string;
  };

  filter = () => {
    let { allStrollers, priceFilters, weightFilter } = this.state;
    let filterResult = [];
    if (this.state.priceFilters.some((element) => element != null)) {
      console.log("if")
      filterResult = priceFilters.map((item, index) =>
        allStrollers
          .filter((item) => item.weight <= weightFilter)
          .filter((item) => item.pricerange === priceFilters[index])
      );
      console.log(filterResult)
    } else {
      filterResult = allStrollers.filter((item) => item.weight <= weightFilter)
      console.log(filterResult)
    }
    this.setState({
      filteredStrollers: filterResult.flat(),
    });
  };

  sliderChangeHandler = (e) => {
    this.setState(
      {
        weightFilter: e.target.value,
      },
      this.filter()
    );
  };

  renderStrollers = () => {
    let listToDisplay = null;
    let { allStrollers, filteredStrollers } = this.state;
    filteredStrollers
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
            <h3>Price Range:</h3>
            <input
              type="button"
              id="0"
              name="€"
              className={this.buttonColorHandler("0", "€")}
              value="€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="1"
              className={this.buttonColorHandler("1", "€€")}
              name="€€"
              value="€€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="2"
              className={this.buttonColorHandler("2", "€€€")}
              name="€€€"
              value="€€€"
              onClick={this.buttonClickHandler}
            />
          </div>
          <div className="Weigth-filter">
            <h3>Maximum weight: {this.state.weightFilter}kg</h3>
            <input
              type="range"
              min="5"
              max="20"
              value={this.state.weightFilter}
              className="slider"
              id="myRange"
              onChange={this.sliderChangeHandler}
            />
          </div>

          <div className="Price-filter">
            <h3>Suitable after birth </h3>
            <input
              type="button"
              id="3"
              name="yes"
              className={this.buttonColorHandler("3", "yes")}
              value="yes"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="4"
              className={this.buttonColorHandler("4", "no")}
              name="no"
              value="no"
              onClick={this.buttonClickHandler}
            />
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
