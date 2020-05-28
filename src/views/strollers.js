import React, { Component } from "react";
import apiClient from "../services/Strollers.js";
import { Link } from "react-router-dom";
import "../styles/homepage/filters.css";
import "../styles/homepage/sidebar.css";
import "../styles/homepage/pagination.css";
import "../styles/homepage/strollers.css";

export default class Strollers extends Component {
  state = {
    sideBar: true,
    allStrollers: [],
    filteredStrollers: [],
    numberOfPages: false,
    currentPage: false,
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
            filteredStrollers: data,
          },
          () => {
            this.setState({ loadStatus: false });
            this.calculatePages();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.loadStrollers();
  }

  buttonClickHandler = (e) => {
    let { name, value } = e.target;
    let { filter } = this.state;
    filter.map((item, index) => {
      if (item.Field === name) {
        if (item.Values.includes(value)) {
          let ind = item.Values.indexOf(value);
          return item.Values.splice(ind, 1);
        } else {
          return item.Values.push(value);
        }
      } else {
        return false;
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
    this.setState(
      {
        filteredStrollers: filtered,
      },
      () => {
        this.calculatePages();
      }
    );
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

  calculatePages = () => {
    const { filteredStrollers } = this.state;
    let nbPages,
      currentPage = false;
    nbPages = Math.ceil(filteredStrollers.length / 5);
    nbPages > 0 ? (currentPage = 1) : (currentPage = false);
    this.setState(
      {
        numberOfPages: nbPages,
        currentPage: currentPage,
      },
      () => this.paginationMenu()
    );
  };

  handleSideBar = () => {
    this.setState({
      sideBar: !this.state.sideBar,
    });
  };

  paginationMenu = () => {
    const { numberOfPages } = this.state;
    let pagesArray = [];
    for (let i = 1; i <= numberOfPages; i++) {
      let a = (
        <div key={i}>
          <input
            type="button"
            className={
              this.state.currentPage === i ? "Active-button" : "Inactive-button"
            }
            value={i}
            onClick={this.pageClickHandler}
          />
        </div>
      );
      pagesArray.push(a);
    }
    if (pagesArray.length > 1) {
      return pagesArray.map((item, index) => {
        return item;
      });
    } else {
      return <div className="Inactive-button"></div>;
    }
  };

  pageButtonStatus = (e) => {
    console.log(e);
  };

  pageClickHandler = (e) => {
    this.setState({ currentPage: Number(e.target.value) }, () =>
      this.paginated()
    );
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
                <div>
                  € <span>(400€)</span>
                </div>
              </label>
              <label className="container">
                <input
                  type="checkbox"
                  name="pricerange"
                  value="€€"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>
                  €€ <span>(400€-800€)</span>
                </div>
              </label>
              <label className="container">
                <input
                  type="checkbox"
                  name="pricerange"
                  value="€€€"
                  onClick={this.buttonClickHandler}
                />
                <span className="checkmark"></span>
                <div>
                  €€€ <span>(>800€)</span>
                </div>
              </label>
            </div>
            <div className="Weigth-filter">
              <h3>Max weight: {this.state.weigth}kg</h3>
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

  paginated = () => {
    let { filteredStrollers, numberOfPages, currentPage } = this.state;
    let sliceIndex = [];
    if (currentPage === 1) {
      sliceIndex = [0, 4];
    } else if (currentPage === 2) {
      sliceIndex = [4, 9];
    }
    return sliceIndex;
  };

  renderStrollers = () => {
    let {
      filteredStrollers,
      numberOfPages,
      currentPage,
      filterState,
    } = this.state;
    let start = this.paginated()[0];
    let end = this.paginated()[1];
    if (numberOfPages === 0 && filterState) {
      return (
        <div className="No-results">
          <div>No Results matching your criteria</div>
        </div>
      );
    } else {
      return filteredStrollers.slice(start, end).map((item, index) => {
        return (
          <div key={index}className="Stroller-card">
            <img
              className="Stroller-img"
              src={item.image}
              alt={item.name}
            ></img>
            <div>{item.name}</div>
            <div>{item.brand} </div>
            <section>
              <div>{item.weight} kg</div>
              <div>{item.pricerange}</div>
              <div>{item.birth}</div>
              <div>{item.maxweight} kg</div>
              <div>{item.handle}</div>
              <div>{item.sport}</div>
              <div>{item.allterrain}</div>
              <div>{item.airline}</div>
              <div>{item.double}</div>
            </section>
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
        {this.renderFilters()}
        <div className="Pagination-stroller-container">
          <div className="Pagination-menu">{this.paginationMenu()}</div>
          <div className="Stroller-container">
            <div className="labels">
              <section>
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
              </section>
            </div>
            {this.renderStrollers()}
          </div>
        </div>
      </div>
    );
  }
}
