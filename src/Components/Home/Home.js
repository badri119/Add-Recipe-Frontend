import React, { useState } from "react";
import "./Home.css";
import Dummy from "../../dummy.json";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddPost from "../AddPost/AddPost";
import Axios from "axios";

const Home = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
    },
  };
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(Dummy);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // Filter recipes based on the search input

  const handleSearchInputChange = (event) => {
    const temp = Dummy.filter((recipe) => {
      let relevant = false;

      // searching for recipe name
      const recipe_present = recipe.Recipe_name.toLowerCase().includes(
        event.target.value.toLowerCase()
      );
      if (recipe_present) relevant = recipe_present;

      // searching for ingredients
      recipe.Ingredients.map(function (ingred) {
        const included = ingred
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
        if (included) relevant = included;
      });
      return relevant;
    });

    setFilteredRecipes(temp);
    setSearchInput(event.target.value);
  };

  const getrecipes = () => {
    Axios.get("http://localhost:3000/recipes").then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="homegradient">
      <div className="topbar">
        <ul>
          <li>
            <a onClick={openModal}> Add a Recipe</a>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <AddPost close={closeModal} />
            </Modal>
          </li>
          <li>
            <Link href="">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="box">
        <input
          className="searchbox"
          placeholder="🔍 Recipe"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="card-group">
        {filteredRecipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <h4 className="recipename">{recipe.Recipe_name}</h4>
            <p> {recipe.Ingredients}</p>
            <p>{recipe.Preparation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
