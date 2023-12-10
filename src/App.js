import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AddPost from "./Components/AddPost/AddPost";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userid, setUserId] = useState("");
  console.log(userid);
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginPage setUserId={setUserId} />}
        ></Route>
        <Route
          path="/signup"
          element={<SignUpPage setUserId={setUserId} />}
        ></Route>
        <Route path="/post" element={<AddPost setUserId={setUserId} />}></Route>
        <Route path="/home" element={<Home userid={userid} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
