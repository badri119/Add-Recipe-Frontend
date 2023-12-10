import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddPost from "../AddPost/AddPost";
import axios from "axios";

const Home = ({ userid }) => {
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
  const [filteredRecipes, setFilteredRecipes] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // Filter recipes based on the search input
  // before searching recipes = 10 filtered recipes = 10,
  // After searching recipes = 10 filtered recipes = 1
  // After clear, recipes = 10, filtered recipes = 10

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);

    if (!event.target.value) {
      setFilteredRecipes(recipes);
      return;
    }
    const temp = recipes.filter((recipe) => {
      let relevant = false;

      // searching for recipe name
      const recipe_present = recipe.recipename
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      if (recipe_present) relevant = recipe_present;

      // searching for ingredients
      recipe.ingredients.map(function (ingred) {
        const included = ingred
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
        if (included) relevant = included;
      });
      return relevant;
    });

    setFilteredRecipes(temp);
  };

  // API call for adding a Recipe
  const addRecipe = async (newRecipeData) => {
    console.log(newRecipeData);
    console.log(userid);
    newRecipeData.userid = userid;

    try {
      const response = await axios.post(
        "http://localhost:3001/recipes/post",
        newRecipeData
      );
      console.log(response.data);
      const temp = [...filteredRecipes, newRecipeData];
      console.log(temp);
      //Update the reciepes in the home dashboard after a recpe is added
      setFilteredRecipes(temp);

      closeModal();
    } catch (error) {
      console.log("Error adding recipe:", error);
    }
  };

  // Api Call for deleteing a Recipe
  const deleteRecipe = async (recipeId) => {
    console.log(recipeId);
    try {
      const response = await axios.delete(
        `http://localhost:3001/recipes/${recipeId}`
      );
      console.log(response.data);

      // Update the filtered recipes after deletion
      const updatedRecipes = filteredRecipes.filter(
        (recipe) => recipe._id !== recipeId
      );
      setFilteredRecipes(updatedRecipes);
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        console.log(response.data);
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error("Error getting recipes", error.message);
        setError(error.response.data.message);
      }
    };
    getRecipe();
  }, []);

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
              <AddPost close={closeModal} addRecipe={addRecipe} />
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
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
            <div className="card" key={recipe._id}>
              <h4 className="recipename">{recipe.recipename}</h4>
              <p> {recipe.ingredients}</p>
              <p>{recipe.preparation}</p>
              <div className="deletebutton">
                <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
