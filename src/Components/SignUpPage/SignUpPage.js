import React, { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, confirmPass] = useState("");
  const [validpass, setValidPass] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSetPassword = (event) => {
    setPass(event.target.value);
  };

  const handlesetMatchPassword = (event) => {
    confirmPass(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // todo: check if both passwords match
      // if passwords match, continue to use api
      // console.log(validpass);

      if (validpass === true) {
        const response = await axios.post("http://localhost:3001/signup", {
          name: name,
          password: pass,
          email: email,
        });
        console.log(response.data);

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup error:", error.message);
        setError(error.response.data.message);
        setSuccess(null);
      }
    }
  };

  return (
    <div className="signupcontainer">
      <div className="signup">
        <div className="signupcontainerform">
          <form onSubmit={handleSubmit} action="">
            <h2>Sign Up to Add Recipe</h2>
            <label htmlFor="name">Name:</label>
            <input
              className="inputbox"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email ID:</label>
            <input
              className="inputbox"
              type="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              size="30"
              required
              placeholder="Enter Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              className="inputbox"
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={pass}
              onChange={handleSetPassword}
              required
            />
            <label className="retype" htmlFor="password">
              Retype Password:
            </label>
            <input
              className="inputbox"
              type="password"
              placeholder="Retype Password"
              name="psw"
              value={cpass}
              onChange={handlesetMatchPassword}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <div className="passwordchecklist">
              <PasswordChecklist
                rules={[
                  "capital",
                  "match",
                  "specialChar",
                  "minLength",
                  "number",
                ]}
                minLength={8}
                value={pass}
                valueAgain={cpass}
                className="checklist"
                onChange={(isValid) => setValidPass(isValid)}
              />
            </div>
            <div className="buttonmain">
              <button className="loginbutton" type="submit">
                SignUp
              </button>
            </div>
          </form>
          <Link to="/" className="signupmain">
            Existing user? Login here!
          </Link>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default SignUpPage;
