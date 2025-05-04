import Lstyles from "../css/Login.module.css";
import logo from "../gifthub.png";
import { useNavigate } from "react-router-dom";
import Sstyles from "../css/Signup.module.css";
import React from "react";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cause, setCause] = useState("--Select--");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToLogin = () => {
    navigate("/"); // or any route
  };

  const handleSignup = (e) => {
    e.preventDefault();

    let checkFlag = true;
    let detailFlag = true;
    const checkDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/users/check-details",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, username }),
          }
        );
        const data = await response.json();

        if (data.message !== "true") {
          detailFlag = false;
          console.log(data.message);
        }
      } catch (err) {
        detailFlag = false;
        console.error("Error checking details");
      }
      return detailFlag;
    };

    checkFlag = checkDetails();

    const validatePassword = () => {
      // Regular expression to check for at least one capital letter and one number
      const hasCapitalLetter = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);

      if (hasCapitalLetter && hasNumber) {
        return true; // Password is valid
      } else {
        console.log("Password should contain a capital alphabet and a number");
        return false; // Password is invalid
      }
    };

    checkFlag = validatePassword();

    if (cause === "--Select--") {
      checkFlag = false;
    }

    const addUser = async () => {
      detailFlag = true;
      const userType = cause;
      try {
        const response = await fetch("http://localhost:5000/users/signup", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, name, userType, username, password }),
        });
        const data = await response.json();

        if (data.message === "Server error") {
          detailFlag = false;
          console.log(data.message);
        }
      } catch (err) {
        detailFlag = false;
        console.error("Error checking details");
      }
      return detailFlag;
    };

    if (checkFlag) {
      checkFlag = addUser();
      if (checkFlag) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className={Lstyles.page_container}>
        <div className={Lstyles.logo_container}>
          <img src={logo} alt="" />
        </div>
        <div className={Lstyles.main}>
          <h1 className={Sstyles.header}>Signup</h1>
          <div className={Lstyles.login}>
            <form onSubmit={handleSignup} id="submit-form">
              <div className={Lstyles.form_group}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  required
                />
                <div className={Sstyles.dropDown}>
                  <label htmlFor="userType" className={Lstyles.txt_color}>
                    I am a:
                  </label>
                  <select
                    name="userType"
                    id="userType"
                    className={Sstyles.txt_color}
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    required
                  >
                    <option
                      value="--Select--"
                      className={Sstyles.txt_color}
                      selected
                    >
                      -- Select --
                    </option>
                    <option value="buyer" className={Sstyles.txt_color}>
                      Buyer
                    </option>
                    <option value="seller" className={Sstyles.txt_color}>
                      Seller
                    </option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Signup</button>
              <span className={Lstyles.ordesign}>Or</span>{" "}
              <button onClick={goToLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
