import React, { useState } from "react";
import "./loginPage.css";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
    navigate("/home");
  };
  return (
    <div className="logincontainer">
      <div className="login">
        <div className="title">
          <h1>Welcome to Add Recipe</h1>
          <p className="meaning">
            A place where you can post and view recipes from all around the
            world!
          </p>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit} action="">
            <h3> Please enter your Email and Password</h3>
            <label for="email">Email ID:</label>
            <br></br>
            <input
              className="inputbox"
              type="email"
              placeholder="Enter Email ID"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <label for="password">Password:</label>
            <br />
            <input
              className="inputbox"
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={pass}
              required
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <div className="buttonmain">
              <button type="submit">Login</button>
            </div>
          </form>

          <br />
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
