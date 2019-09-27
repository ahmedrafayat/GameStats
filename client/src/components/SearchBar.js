import React from "react";
import axios from "axios";
import apex_logo from "../assets/apex_logo.png";
import { Link } from "react-router-dom";
import "../styles/SearchBar.css";

const base_url = process.env.TRACKER_API_URL || "http://localhost:5000/api/v1/profile/";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      selectedPlatform: "origin",
      userProfile: null
    };
  }

  componentDidMount() {
    console.log(this.state.selectedPlatform);
    console.log(base_url);
  }
  render() {
    return (
      <div className="search-bar container">
        <form onSubmit={e => e.preventDefault()} className="ui form large" style={{ width: "80%" }}>
          <div
            className="field"
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              width: "100%"
            }}>
            <input
              placeholder="Enter your user id"
              style={{ flex: "20" }}
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              type="text"
              name="username"
              value={this.state.username}
            />
            <div className="ui icon buttons large" style={{ flex: 2 }}>
              <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: "origin" })}>
                <i className="windows icon"></i>
              </button>
              <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: "playstation" })}>
                <i className="playstation icon"></i>
              </button>
              <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: "xbox" })}>
                <i className="xbox icon"></i>
              </button>
            </div>
            <Link
              to={{
                pathname: `/profile/${this.state.selectedPlatform}/${this.state.username}`,
                state: { selectedPlatform: this.state.selectedPlatform }
              }}
              className="ui animated button large"
              style={{ flex: "2", width: "10vh" }}
              tabIndex="0">
              <div className="visible content">Next</div>
              <div className="hidden content">
                <i className="right arrow icon"></i>
              </div>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
