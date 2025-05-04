import nStyles from "../css/navbar.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [type, setType] = useState(false);

  useEffect(() => {
    const checkSeller = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message === "unauthorized") navigate("/");
      if (data.message) {
        setType(true);
      } else {
        setType(false);
      }
    };
    checkSeller();
  }, []);

  const handleHome = () => {
    navigate("/Main");
  };
  const handleCart = () => {
    navigate("/Cart");
  };
  const handleOrders = () => {
    navigate("/Orders");
  };
  const handleDashboard = () => {
    navigate("/Dashboard");
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();

    if (data) {
      navigate("/");
    }
  };

  return (
    <>
      <nav className={nStyles.navbar}>
        <ul>
          <li>
            <a href="#" onClick={handleHome}>
              <strong>Home</strong>
            </a>
          </li>
          {!type && (
            <li>
              <a href="#" onClick={handleCart}>
                <strong>Cart</strong>
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={handleOrders}>
              <strong>Orders</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleDashboard}>
              <strong>Dashboard</strong>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <strong>Logout</strong>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
