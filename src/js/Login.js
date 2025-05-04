import styles from "../css/Login.module.css";
import logo from "../gifthub.png";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToSignup = () => {
    navigate("/Signup"); // or any route
  };

  const goToHome = async (e) => {
    e.preventDefault();
    //navigate("/Main");
    try {
      const verifyCredentials = await fetch(
        "http://localhost:5000/users/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!verifyCredentials.ok) {
        const error = await verifyCredentials.json();
        throw new Error(error.message || "Login failed");
      }
      const data = await verifyCredentials.json();

      if (data.message === "true") {
        navigate("/Main");
        console.log("Working", data.message);
      } else {
        console.log("Not working", data.message);
      }
    } catch (error) {
      console.error("Network/Server Error:", error);
      // Optionally show user-friendly error message
    }
  };

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.main}>
          <h1 style={{ color: "#fff" }}>Login</h1>
          <div className={styles.login}>
            <form>
              <div className={styles.form_group}>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" onClick={goToHome}>
                Login
              </button>
              <span className={styles.ordesign}>Or</span>{" "}
              <button onClick={goToSignup}>Create an account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
