import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import config from "../config";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      userInfo: null
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onLogoutFailure = this.onLogoutFailure.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    const isLoggedIn = JSON.parse(window.localStorage.getItem("isLoggedIn"));
    try {
      if (user.accessToken.length > 0 && isLoggedIn === true) {
        this.setState({ isLoggedIn: true, userInfo: user });
      } else {
        console.log("Unresolved Error", user, isLoggedIn);
      }
    } catch (err) {
      if (err.name) {
        this.setState({ userInfo: null, isLoggedIn: false });
      }
    }
  }

  onLoginSuccess(response) {
    let user = {
      name: response.profileObj.name,
      accessToken: response.accessToken
    };
    window.localStorage.setItem("isLoggedIn", true);
    window.localStorage.setItem("userInfo", JSON.stringify(user));
    this.setState({ isLoggedIn: true, userInfo: user });
  }
  onLoginFailure(response) {
    console.log("Login Failure!", response);
  }
  onLogoutSuccess(response) {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userInfo");
    this.setState({ userInfo: null, isLoggedIn: false });
  }

  onLogoutFailure(response) {
    console.log("Logout failure!", response);
  }

  render() {
    const { isLoggedIn, userInfo } = this.state;
    return (
      <div className="ui top fixed borderless large menu" style={{ backgroundColor: "#141724" }}>
        <div className="header item" style={{ color: "#FFFFFF", fontWeight: "bolder" }}>
          GameStats
        </div>
        <a href="/" className="link item" style={{ color: "#FFFFFF" }}>
          Home
        </a>
        {!isLoggedIn && !userInfo ? (
          <div className="right menu">
            <div className="item">
              <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.onLoginSuccess}
                onFailure={this.onLoginFailure}
                className="ui google plus button medium"
                icon="google icon"
              />
            </div>
          </div>
        ) : (
          <div className="right menu">
            <div className="item">
              <div className="header" style={{ color: "#FFFFFF", fontWeight: "bolder" }}>
                Hello there, {userInfo.name}
              </div>
            </div>
            <div className="item">
              <GoogleLogout
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.onLogoutSuccess}
                onFailure={this.onLogoutFailure}></GoogleLogout>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
