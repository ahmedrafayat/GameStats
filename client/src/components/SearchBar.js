import React from "react";
import "../styles/SearchBar.css";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      selectedPlatform: "origin"
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.onChangeUsername(this.state.username, this.state.selectedPlatform);
  }

  render() {
    return (
      <div className="search-bar container">
        <form onSubmit={e => e.preventDefault()} className="ui form big" style={{ width: "80%" }}>
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
            <div className="ui icon buttons big" style={{ flex: 2 }}>
              <button className="ui active icon button" onClick={() => this.setState({ selectedPlatform: "origin" })}>
                <i className="windows icon"></i>
              </button>
              <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: "playstation" })}>
                <i className="playstation icon"></i>
              </button>
              <button className="ui icon button" onClick={() => this.setState({ selectedPlatform: "xbox" })}>
                <i className="xbox icon"></i>
              </button>
            </div>
            <button onClick={this.onSubmit} className="ui animated button big" tabIndex="0">
              <div className="visible content">Next</div>
              <div className="hidden content">
                <i className="right arrow icon"></i>
              </div>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
