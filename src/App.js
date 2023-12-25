import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AddPost from "./Components/AddPost/AddPost";
import Home from "./Components/Home/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [userid, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [username, setUserName] = useState("");

  // console.log(userid);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginPage
              setToken={setToken}
              setUserId={setUserId}
              setUserName={setUserName}
            />
          }
        ></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/post"
            element={<AddPost token={token} setUserId={setUserId} />}
          ></Route>
          <Route
            path="/home"
            element={
              <Home
                token={token}
                setToken={setToken}
                userid={userid}
                username={username}
                setUserId={setUserId}
                setUserName={setUserName}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
