// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CountryDetail from "./components/CountryDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
