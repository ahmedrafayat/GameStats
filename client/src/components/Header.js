import React from "react";
import axios from "axios";
import apex_logo from "../assets/apex_logo.png";
import { Link } from "react-router-dom";
// import octane_photo from '../assets/octane.png'
import "../styles/Header.css";

const base_url = process.env.TRACKER_API_URL || "http://localhost:5000/api/v1/profile/";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      selectedPlatform: "origin",
      userProfile: null
    };
  }

  async getProfile(e) {
    e.preventDefault();
    const res = await axios.get(`/api/v1/profile/${this.state.selectedPlatform}/${this.state.username}`);
    console.log(res.data);
    this.setState({ userProfile: res.data.data });
  }

  componentDidMount() {
    console.log(this.state.selectedPlatform);
    console.log(base_url);
  }
  render() {
    return (
      <div className="ui stackable grid container">
        <div className="row">
          <div className="sixteen wide column">
            <img className="ui medium image fluid logo-img" src={apex_logo} alt="Logo" />
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column">
            <form className="ui form sf" style={{ width: "80%" }}>
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
                <div className="ui icon buttons" style={{ flex: 2 }}>
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
                {/* <Link to="/profile" className="ui animated button" style={{ flex: '2', width: '10vh' }} tabIndex="0" onClick={(e) => this.getProfile(e)}>
                                    <div className="visible content">Next</div>
                                    <div className="hidden content">
                                        <i className="right arrow icon"></i>
                                    </div>
                                </Link> */}
                <Link
                  to={{
                    pathname: `/profile/${this.state.selectedPlatform}/${this.state.username}`,
                    state: { selectedPlatform: this.state.selectedPlatform }
                  }}
                  className="ui animated button"
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
        </div>
        {/* <img className="ui huge image fluid" style={{ position: 'absolute', background: 'lightgrey' }} src={octane_photo} alt="octane-photo" /> */}
      </div>
    );
  }
}
export default Header;
