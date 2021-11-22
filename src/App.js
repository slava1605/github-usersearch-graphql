import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Main from "./pages/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" caseSensitive={false} element={<Main />} />
        </Routes>
      </Router>
    )
  }
}

export default App;

