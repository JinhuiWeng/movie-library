import React, { Component } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import MovieForm from "./components/movieForm";
import ProtectedRoute from "./components/common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    //Wrapper function component to pass 
    //the params via the match property to a Class Component
    const Wrapper = (props) => {
      const params = useParams();
      return <MovieForm {...{...props, match: {params}} }/>
    }

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/movies" element={<Movies user={this.state.user} />} />
            <Route path="/movies/:_id" element={<Wrapper />} />
            <Route path="/not-found" element={<NotFound />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/" element={<Navigate to="/movies" replace />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
