import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, confirmPass] = useState("");
  const [validpass, setValidPass] = useState(false);

  function handleSetPassword(event) {
    setPass(event.target.value);
  }

  function handlesetMatchPassword(event) {
    confirmPass(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // todo: check if both passwords match
    // if passwords match, continue to use api
    console.log(validpass);

    if (validpass === true) {
      axios
        .post("http://localhost:3001/signup", {
          name: name,
          password: pass,
          email: email,
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  };
  return (
    <div className="signupcontainer">
      <div className="signup">
        <div className="container">
          <form onSubmit={handleSubmit} action="">
            <h2> Sign Up to Add Recipe</h2>
            <label for="name">Name:</label>
            <input
              className="inputbox"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label for="email">Email ID:</label>
            <input
              className="inputbox"
              type="email"
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label for="password">Password:</label>
            <br />
            <input
              className="inputbox"
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={pass}
              onChange={handleSetPassword}
            ></input>

            <label className="retype" for="password">
              Retype Password:
            </label>
            <input
              className="inputbox"
              type="password"
              placeholder="Retype Password"
              name="psw"
              value={cpass}
              onChange={handlesetMatchPassword}
            ></input>
            <PasswordChecklist
              rules={["capital", "match", "specialChar", "minLength", "number"]}
              minLength={8}
              value={pass}
              valueAgain={cpass}
              className="checklist"
              onChange={(isValid) => setValidPass(isValid)}
            />
            <div className="buttonmain">
              <button type="submit">SignUp</button>
            </div>
          </form>
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
