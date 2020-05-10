import React, { Component } from "react";
import apiClient from "../services/Strollers.js";

export default class Strollers extends Component {
  state = {
    filters: [null, null, null],
    allStrollers: [],
    filteredStrollers: null,
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
    let id = e.target.id;
    let buttonStatus = this.state.filters;
    buttonStatus[id] === id
      ? (buttonStatus[id] = null)
      : (buttonStatus[id] = id);
    this.forceUpdate();
    this.filter()
  };

  buttonColorHandler = (id) => {
    let string = "";
    let buttonStatus = this.state.filters;
    buttonStatus[id] === id
      ? (string = "ActiveButton")
      : (string = "InactiveButton");
    return string;
  };

  filterConstruction = () => {
    let { filters } = this.state;
    let clean = [];
    let a = 0;
    filters.map((item, index) => {
      if (filters[index] === "0") {
        clean[a] = "€";
      } else if (filters[index] === "1") {
        clean[a] = "€€";
      } else if (filters[index] === "2") {
        clean[a] = "€€€";
      }
      a++;
      return clean;
    });
    return clean;
  };

  filter = () => {
    let { allStrollers } = this.state;
    let filterArray = this.filterConstruction();
    let essai = null;
    essai = filterArray.map((item, index) =>
      allStrollers.filter((item) => item.pricerange === filterArray[index])
    );
    this.setState({
      filteredStrollers: essai.flat()
    })
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
            <h2>Price Range:</h2>
            <input
              type="button"
              id="0"
              className={this.buttonColorHandler("0")}
              value="€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="1"
              className={this.buttonColorHandler("1")}
              value="€€"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="2"
              className={this.buttonColorHandler("2")}
              value="€€€"
              onClick={this.buttonClickHandler}
            />
          </div>
          <div className="Weight-filter">
             Maximum weight
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
