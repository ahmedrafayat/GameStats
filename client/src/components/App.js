import React from "react";
import "../styles/App.css";
import { Helmet } from "react-helmet";
import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
require("dotenv").config({ path: "./client/config.env" });
// import octane from '../assets/octane.png'

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #c70d3a; }"}</style>
        </Helmet>
        <div>
          <BrowserRouter>
            <Header />
            <Route path="/profile/:platform/:username" component={UserProfile}></Route>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
