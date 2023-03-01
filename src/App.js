import React, { Component } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import auth from "./services/authService";

import "./App.css";
import Movies from "./components/movies";

class App extends Component {
  state = {};

  // componentDidMount() {
  //   const user = auth.getCurrentUser();
  //   this.setState({ user });
  // }

  render() {
    // const { user } = this.state;

    return (
      <React.Fragment>
        <main className="container">
          <Routes>
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
