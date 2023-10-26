import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, confirmPass] = useState("");

  const handleSubmit = (e) => {
    e.preventdefault();
  };
  return (
    <div className="signupcontainer">
      <div className="signup">
        <div className="container">
          <form onSubmit={handleSubmit} action="">
            <h2> Sign Up to Add Recipe</h2>
            <label for="name">Name:</label>
            <br></br>
            <input
              className="inputbox"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label for="email">Email ID:</label>
            <br></br>
            <input
              className="inputbox"
              type="email"
              placeholder="Enter Email ID"
              value={email}
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
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <label className="retype" for="password">
              Retype Password:
            </label>
            <br />
            <input
              className="inputbox"
              type="password"
              placeholder="Retype Password"
              name="psw"
              value={cpass}
              onChange={(e) => confirmPass(e.target.value)}
            ></input>
            <br></br>
            <br></br>
            <div className="buttonmain">
              <button type="submit">SignUp</button>
            </div>
          </form>
          <br />
          <Link to="/" className="signupmain">
            {" "}
            Existing user? Login here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
