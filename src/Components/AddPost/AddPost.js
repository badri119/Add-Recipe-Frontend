import React, { useState, useEffect } from "react";
import "./AddPost.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = ({
  close,
  addRecipe,
  editedRecipe,
  isEditing,
  token,
  filteredRecipes,
  setFilteredRecipes,
  setAllRecipes,
}) => {
  const [formData, setFormData] = useState({
    recipename: "",
    type: "",
    ingredients: "",
    preparation: "",
  });

  const navigate = useNavigate();

  // console.log(editedRecipe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevFormData) => {
      console.log(prevFormData);
      console.log(name, value);
      return { ...prevFormData, [name]: value };
    });
  };

  //API for calling Edit Recipe
  const editRecipe = async (recipeId, updatedData) => {
    try {
      // console.log(token);
      const editedResponse = await axios.patch(
        `http://localhost:3001/recipes/${recipeId}`,
        updatedData,
        {
          headers: { Auth_Token: token },
        }
      );
      const updatedRecipe = editedResponse.data;
      const updatedRecipes = filteredRecipes.map((recipe) => {
        if (recipe._id === recipeId) {
          return updatedRecipe;
        } else {
          return recipe;
        }
      });
      setFilteredRecipes(updatedRecipes);
      setAllRecipes(updatedRecipes);
      // console.log(editedResponse.data);
      close();
    } catch (error) {
      // console.log("Error updating recipe:", error);
      if (error.response.status === 401) {
        // console.log(error.response.status);
        navigate("/");
        return;
      }
    }
  };

  useEffect(() => {
    // console.log(isEditing);
    // console.log(formData);
    if (isEditing) {
      setFormData(editedRecipe);
    } else {
      setFormData({
        recipename: "",
        type: "",
        ingredients: "",
        preparation: "",
      });
    }
  }, [editedRecipe, isEditing]);
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(
    //   `Name: ${formData.recipename}, Type: ${formData.type}, Message: ${formData.ingredients}, Preps: ${formData.preparation}`
    // );
  };
  return (
    <div>
      <div className="maincontainer">
        <div className="postcontainer">
          <div className="closearrow">
            <AiFillCloseCircle size={33} onClick={close}></AiFillCloseCircle>
          </div>
          <form
            className=""
            onSubmit={function (e) {
              handleSubmit(e);
            }}
          >
            <input
              className="inputclass"
              type="text"
              id="rname"
              name="recipename"
              value={formData.recipename}
              placeholder="Recipe's Name.."
              onChange={handleChange}
              required
            ></input>
            <div className="title_options">
              <label className="type" htmlFor="type">
                Type
              </label>
              <div className="select-dropdown">
                <select
                  className="select-dropdown-options"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="hide">Options</option>
                  <option value="Entree">Entree</option>
                  <option value="Mains">Mains</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
            </div>
            <label htmlFor="ingredients"></label>
            <textarea
              className="ingrdientsinputclass"
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              placeholder="Enter the ingredients Requried"
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="preparation"></label>
            <textarea
              className="ingrdientsinputclass"
              type="text"
              id="preparation"
              name="preparation"
              value={formData.preparation}
              onChange={handleChange}
              placeholder="Type your preparation steps here.."
              required
            ></textarea>
            <div className="buttonmain">
              <button
                className="postbutton"
                type="submit"
                onClick={() => {
                  if (isEditing) {
                    editRecipe(editedRecipe._id, formData);
                  } else {
                    addRecipe(formData);
                  }
                }}
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
