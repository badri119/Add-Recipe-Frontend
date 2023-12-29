import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddPost from "../AddPost/AddPost";
import axios from "axios";

const Home = ({
  userid,
  token,
  setToken,
  username,
  setUserId,
  setUserName,
}) => {
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
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const [allRecipes, setAllRecipes] = useState([]);
  const [editedRecipe, setEditedRecipe] = useState({
    recipename: "",
    type: "",
    ingredients: "",
    preparation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
    setIsEditing(false);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    // console.log(searchInput);
    // console.log(allRecipes);
    // console.log(filteredRecipes);

    const temp = allRecipes.filter((recipe) => {
      let relevant = false;

      // searching for recipe name
      const recipe_present = recipe.recipename
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      if (recipe_present) relevant = recipe_present;
      // console.log(recipe_present);

      // console.log(recipe.ingredients);

      // searching for ingredients
      recipe.ingredients.map((ingred) => {
        const included = ingred
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
        if (included) relevant = included;
        // console.log(included);
      });

      return relevant;
    });

    setFilteredRecipes(temp);
  };

  // API call for adding a Recipe
  const addRecipe = async (newRecipeData) => {
    // console.log(userid);
    newRecipeData.userid = userid;
    newRecipeData.username = username;

    try {
      const response = await axios.post(
        "http://localhost:3001/recipes/post",
        newRecipeData,
        { headers: { Auth_Token: token } }
      );
      // console.log(username);
      // console.log(response.data.userid);

      // const newData = console.log(response.data);
      const recipeUserName = response.data.username;
      // console.log(response.data);

      const newData = response.data;

      // console.log(recipeUserName);
      newRecipeData._id = response.data._id;
      const temp = [...filteredRecipes, newData];

      // console.log(filteredRecipes);
      // console.log(newRecipeData);
      // console.log(temp);
      // console.log(temp);
      //Update the reciepes in the home dashboard after a recipe is added
      setFilteredRecipes(temp);
      setAllRecipes(temp);
      // console.log(filteredRecipes);

      closeModal();
    } catch (error) {
      // console.log("Error adding recipe:", error);
      if (error.response.status === 401) {
        // console.log(error.response.status);
        navigate("/");
        return;
      }
    }
  };

  const editRecipebutton = (recipe) => {
    openModal();
    // store this recipe in a state
    setEditedRecipe(recipe);
    setIsEditing(true);
  };
  // Pass this state to AddPost Component

  // API Call for deleteing a Recipe
  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/recipes/${recipeId}`,
        {
          headers: { Auth_Token: token },
        }
      );
      // console.log(response.data);

      const updatedRecipes = filteredRecipes.filter(
        (recipe) => recipe._id !== recipeId
      );
      setFilteredRecipes(updatedRecipes);
      setAllRecipes(updatedRecipes);
    } catch (error) {
      // console.log("Error deleting recipe:", error);
      if (error.response.status === 401) {
        // console.log(error.response.status);
        navigate("/");
        return;
      }
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        //Getting Recipes from backend
        const response = await axios.get("http://localhost:3001/recipes", {
          headers: { Auth_Token: token },
        });
        // console.log(response.data);
        setAllRecipes(response.data);
        setFilteredRecipes(response.data);
        // console.log(token);
      } catch (error) {
        if (error.response.status === 401) {
          // console.log(error.response);
          navigate("/");
          return;
        }
        console.error("Error getting recipes", error.message);
        setError(error.response.data.message);
      }
    };
    if (token) {
      getRecipe();
    }
    const localtoken = localStorage.getItem("jsonwebtoken");
    const userids = localStorage.getItem("userid");
    const recipeUserName = localStorage.getItem("username");
    // console.log(localtoken);
    if (localtoken) {
      setToken(localtoken);
    }
    if (userids) {
      setUserId(userids);
    }
    if (recipeUserName) {
      setUserName(recipeUserName);
    }
  }, [token, navigate, setToken]);

  //logout functionality
  const logout = () => {
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    setToken("");
    setUserId("");
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    // filtered recipes array -> do operations on this to show searched results
    // console.log("This is Filtered Recipes", filteredRecipes);
    // // original recipes array (List of all recipes)
    // console.log("This is Recipes", allRecipes);
  }, [filteredRecipes, allRecipes]);

  return (
    <div className="homegradient">
      <div className="topbar">
        <ul>
          <li>
            <a onClick={openModal} className="add-recipe-btn">
              {" "}
              Add a Recipe
            </a>
            <Modal
              ariaHideApp={false}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <AddPost
                editedRecipe={editedRecipe}
                close={closeModal}
                addRecipe={addRecipe}
                isEditing={isEditing}
                token={token}
                filteredRecipes={filteredRecipes}
                setFilteredRecipes={setFilteredRecipes}
                setAllRecipes={setAllRecipes}
              />
            </Modal>
          </li>
          <li>
            <Link onClick={logout} class="logout-btn">
              Logout
            </Link>
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
              <div className="card-content">
                <div className="recipe-header">
                  <h4 className="recipename">{recipe.recipename}</h4>
                  <h4 className="author">Recipe by {recipe.username} </h4>
                </div>
                <p className="ingredients">{recipe.type}</p>
                <p className="ingredients">{recipe.ingredients}</p>
                <p className="preparation">{recipe.preparation}</p>
                {recipe.userid === userid && (
                  <div className="deletebutton">
                    <button
                      className="fade"
                      onClick={() => editRecipebutton(recipe)}
                    >
                      Edit
                    </button>
                    <button
                      className="fade"
                      onClick={() => deleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
