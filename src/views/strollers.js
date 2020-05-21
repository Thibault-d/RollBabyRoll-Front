import React, { Component } from "react";
import apiClient from "../services/Strollers.js";
import { Link } from "react-router-dom";

export default class Strollers extends Component {
  state = {
    allStrollers: [],
    filteredStrollers: [],
    filter: [null, null, null, 20, null, null],
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
    let buttonStatus = this.state.filter;
    buttonStatus[id] === name
      ? (buttonStatus[id] = null)
      : (buttonStatus[id] = name);

    this.filter();
  };

  buttonColorHandler = (id, name) => {
    let string = "";
    let buttonStatus = this.state.filter;
    buttonStatus[id] === name
      ? (string = "ActiveButton")
      : (string = "InactiveButton");
    return string;
  };

  filter = () => {
    let { allStrollers, filter } = this.state;
    let priceResult,
      birthResult,
      weightResult,
      activeFilters,
      concatResult = [];

    let counts = {};

    let priceFilter = filter.slice(0, 3);
    let priceFilterStatus = priceFilter.some((el) => el !== null) ? 1 : 0;

    let weightFilter = filter[3];
    let weightFilterStatus = weightFilter !== 20 ? 1 : 0;

    let birthFilter = filter.slice(4, 6);
    let birthFilterStatus = birthFilter.some((el) => el !== null) ? 1 : 0;
    let idResult = [];
    let test = [];
    activeFilters =
      priceFilterStatus +
      weightFilterStatus +
      birthFilterStatus; /* counting number of active filters */

    priceResult = priceFilter.map((item, index) =>
      allStrollers.filter((item) => item.pricerange === priceFilter[index])
    );

    weightResult = allStrollers.filter((item) => item.weight <= weightFilter);

    birthResult = birthFilter.map((item, index) =>
      allStrollers.filter((item) => item.birth === birthFilter[index])
    );

    concatResult = concatResult.concat(
      priceResult.flat(),
      weightResult,
      birthResult.flat()
    ); /*joining all filter results */
    idResult = concatResult.map((item, index) => (idResult[index] = item._id));

    for (let i = 0; i < idResult.length; i++) {
      let num = idResult[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    Object.keys(counts).forEach((key) => {
      if (counts[key] === activeFilters) {
        test.push(key);
      } else {
      }
    });

    this.setState({
      filteredStrollers: test
        .map((item, index) =>
          allStrollers.filter((item) => item._id === test[index])
        )
        .flat(),
    });
  };

  sliderChangeHandler = (e) => {
    this.state.filter[3] = e.target.value;
    this.filter();
  };

  renderStrollers = () => {
    let listToDisplay = [];
    let { allStrollers, filteredStrollers } = this.state;
    filteredStrollers
      ? (listToDisplay = filteredStrollers)
      : (listToDisplay = allStrollers);

    if (filteredStrollers.length === 0) {
      return (
        <div className="No-results">
          <div>No Results :-( </div>
          <div>Try changing the filters !</div>
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
            <h3>Maximum weight: {this.state.filter[3]}kg</h3>
            <input
              type="range"
              min="5"
              max="20"
              value={this.state.filter[3]}
              className="slider"
              id="myRange"
              onChange={this.sliderChangeHandler}
            />
          </div>
          <div className="Price-filter">
            <h3>Suitable for newborn </h3>
            <input
              type="button"
              id="4"
              name="yes"
              className={this.buttonColorHandler("4", "yes")}
              value="yes"
              onClick={this.buttonClickHandler}
            />
            <input
              type="button"
              id="5"
              className={this.buttonColorHandler("5", "no")}
              name="no"
              value="no"
              onClick={this.buttonClickHandler}
            />
          </div>
        </div>
        <div className="Stroller-container">
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
