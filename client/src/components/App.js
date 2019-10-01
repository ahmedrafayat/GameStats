import React from "react";
import "../styles/App.css";
import { Helmet } from "react-helmet";
import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home";
require("dotenv").config({ path: "./client/config.env" });

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <style>{"body { background-color: #222831; z-index: -1; }"}</style>
        </Helmet>
        <Header />
        <div>
          <BrowserRouter>
            <Route exact path="/" component={Home}></Route>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
