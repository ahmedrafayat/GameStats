import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import config from "../config";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div class="ui borderless large menu">
        <Link to="/" class="item">
          Home
        </Link>
        <div class="right menu">
          <div class="item">
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="ui google plus button medium"
              icon="google icon"
            />
          </div>
          <div className="item">
            <FacebookLogin
              appId=""
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="ui facebook button medium"
              icon="facebook icon"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
