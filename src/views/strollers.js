import React, { Component } from "react";
import apiClient from "../services/Strollers.js";
import { Link } from "react-router-dom";
import "../styles/homepage/filters.css";
import "../styles/homepage/sidebar.css";

export default class Strollers extends Component {
  state = {
    sideBar: true,
    allStrollers: [],
    filteredStrollers: [],
    numberOfPages: false,
    loadStatus: false,
    filterState: false,
    filter: [
      { Field: "pricerange", Values: [] },
      { Field: "birth", Values: [] },
    ],
    weigth: false,
  };

  loadStrollers() {
    const { loadStatus } = this.state;
    this.setState({ loadStatus: true });
    apiClient
      .getAllStrollers()
      .then(({ data }) => {
        this.setState(
          {
            allStrollers: data,
          },
          () => {
            this.setState({ loadStatus: false });
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadStrollers();
    this.calculatePages();
  }

  buttonClickHandler = (e) => {
    let { name, value } = e.target;
    let { filter } = this.state;
    filter.map((item, index) => {
      if (item.Field === name) {
        if (item.Values.includes(value)) {
          let ind = item.Values.indexOf(value);
          item.Values.splice(ind, 1);
        } else {
          item.Values.push(value);
        }
      } else {
      }
    });
    this.filter();
  };

  filter = () => {
    const { allStrollers, filter, weigth, filterState } = this.state;
    let filterUsed = [];
    filter.map((item, index) => {
      item.Values.length > 0 ? filterUsed.push(item) : console.log();
    });
    Array.prototype.flexFilter = function (info) {
      return this.filter((item) => {
        return info.every((i) => {
          return i.Values.indexOf(item[i.Field]) > -1;
        });
      });
    };
    let filtered = allStrollers.flexFilter(filterUsed);
    if (weigth) {
      filtered = filtered.filter((stroller) => stroller.weight <= weigth);
    } else {
    }
    this.setState({
      filteredStrollers: filtered,
    });
    if (
      filter[0].Values.length > 0 ||
      filter[1].Values.length > 0 ||
      weigth !== false
    ) {
      this.setState({ filterState: true });
    } else {
      this.setState({ filterState: false });
    }
  };

  sliderChangeHandler = (e) => {
    this.setState(
      {
        weigth: e.target.value,
      },
      () => this.filter()
    );
  };

  toDisplay = () => {
    let { allStrollers, filteredStrollers, filterState } = this.state;
    let listToDisplay = filteredStrollers;
    let filtered = filteredStrollers.length;
    if (filtered > 0) {
      return filteredStrollers;
    } else {
      return allStrollers;
    }
    return filteredStrollers;
  };

  renderStrollers = () => {
    let { allStrollers, filteredStrollers, filterState } = this.state;
    let filtered = filteredStrollers.length;

    let listToDisplay = this.toDisplay();

    if (filtered === 0 && filterState) {
      return (
        <div className="No-results">
          <div>No Results matching your criteria</div>
        </div>
      );
    } else {
      return listToDisplay.map((item, index) => {
        return (
          <div key={index} className="Stroller-column">
            <img
              className="Stroller-img"
              src={item.image}
              alt={item.name}
            ></img>
            <div>{item.name}</div>
            <div>{item.brand} </div>
            <div>{item.weight} kg</div>
            <div>{item.pricerange}</div>
            <div>{item.birth}</div>
            <div>{item.maxweight} kg</div>
            <div>{item.handle}</div>
            <div>{item.sport}</div>
            <div>{item.allterrain}</div>
            <div>{item.airline}</div>
            <div>{item.double}</div>
            <Link to={`/detail:${item._id}`}>
              <input type="button" value="More details" />
            </Link>
          </div>
        );
      });
    }
  };

  calculatePages = () => {
    const { filteredStrollers, allStrollers } = this.state;
    let arrayToPaginate = [];
    let nbPages = 0;
    filteredStrollers
      ? (arrayToPaginate = filteredStrollers)
      : (arrayToPaginate = allStrollers);
    nbPages = Math.ceil(arrayToPaginate.length / 5);
    this.setState({
      numberOfPages: nbPages,
    });
  };

  paginationMenu = () => {
    const { numberOfPages } = this.state;
    let test = [];
    for (let i = 0; i <= numberOfPages; i++) {
      test.push(i);
    }
    return test.map((index, item) => {
      return (
        <div key={index}>
          <input type="button" value={item} />{" "}
        </div>
      );
    });
  };

  renderFilters = () => {
    const sideBar = this.state.sideBar;
    if (sideBar === true) {
      return (
        <div className="Sidebar">
          <div className="Filter-container">
            <div className="Checkbox-filter">
              <h3>Price Range:</h3>
              <label className="container">
                <input
                  type="checkbox"
                  name="pricerange"
                  value="€"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>€ (400€)</div>
              </label>
              <label className="container">
                <input
                  type="checkbox"
                  name="pricerange"
                  value="€€"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>€€ (400€-800€)</div>
              </label>
              <label className="container">
                <input
                  type="checkbox"
                  name="pricerange"
                  value="€€€"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>€€€ (>800€)</div>
              </label>
            </div>
            <div className="Weigth-filter">
              <h3>Maximum weight: {this.state.weigth}kg</h3>
              <input
                type="range"
                min="5"
                max="20"
                value={this.state.weigth}
                className="slider"
                id="myRange"
                onChange={this.sliderChangeHandler}
              />
            </div>
            <div className="Checkbox-filter">
              <h3>Suitable for newborn </h3>
              <label className="container">
                <input
                  type="checkbox"
                  name="birth"
                  value="yes"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>Yes</div>
              </label>
              <label className="container">
                <input
                  type="checkbox"
                  name="birth"
                  value="no"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>No</div>
              </label>
            </div>
          </div>
          <input
            id="Sidebar-controller"
            type="button"
            onClick={this.handleSideBar}
            value="<"
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            id="Sidebar-controller"
            type="button"
            onClick={this.handleSideBar}
            value=">"
          />
        </div>
      );
    }
  };

  handleSideBar = () => {
    this.setState({
      sideBar: !this.state.sideBar,
    });
  };

  render() {
    return (
      <div className="App-header">
        {this.renderFilters()}
        <div className="Stroller-container">
          {this.paginationMenu()}
          <div className="labels">
            <div className="Stroller-img"></div>
            <div>Model</div>
            <div>Brand </div>
            <div>Weight </div>
            <div>Price range</div>
            <div>Suitable for newborn</div>
            <div>Maximum Weight </div>
            <div>Handle</div>
            <div>Ok for sport </div>
            <div>All terrain</div>
            <div>Carry-on in plane</div>
            <div>Double </div>
          </div>
          {this.renderStrollers()}
        </div>
      </div>
    );
  }
}
