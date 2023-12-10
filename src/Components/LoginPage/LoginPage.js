import React, { useState } from "react";
import "./loginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Loginpage = ({ setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        const temp = response.data.userid;
        setUserId(temp);

        // store user id in a state variable
        //
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="logincontainer">
      <div className="login">
        <div className="title">
          <h1>Welcome to Add Recipe</h1>
          <p className="meaning">
            A website dedicated to culinary delights accessible to people
            worldwide!
          </p>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit} action="">
            <h3> Please enter your Email and Password</h3>
            <label for="email">Email ID:</label>

            <input
              className="inputbox"
              type="email"
              placeholder="Enter Email ID"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label for="password">Password:</label>

            <input
              className="inputbox"
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error && <p className="error-message">{error}</p>}
            <div className="buttonmain">
              <button type="submit">Login</button>
            </div>
          </form>

          <Link to="/signup" className="signupmain">
            {" "}
            If you are a new user, Signup here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
