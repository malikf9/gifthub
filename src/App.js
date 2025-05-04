//import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./js/Login";
import Signup from "./js/Signup";
import Main from "./js/Main";
import Cart from "./js/Cart";
import Orders from "./js/Orders";
import Dashboard from "./js/Dashboard";
import React from "react";
//import Test from "./js/Test";

function App() {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Login />} />*/}
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
