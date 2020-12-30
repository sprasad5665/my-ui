import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
    stocks: []
  };
  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };
  makeApiCall = (searchInput) => {
    var searchUrl = `http://127.0.0.1:5000/api/v1/resources/stocks?stockName=${searchInput}`;
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({ stocks: jsonData});
      });
  };
  render() {
    return (
      <div>
        <h1>Welcome to the search app</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.stocks ? (
          <div>
            {this.state.stocks.map((stock, index) => (
              <div key={index}>
                <h1>Summary</h1>
                 <img src={stock.logo_url} alt="stock-thumbnail" />
                {stock.longBusinessSummary}
              </div>
            ))}
          </div>
        ) : (
          <p>Try searching for a stock</p>
        )}
      </div>
    );
  }
}
export default Search;
