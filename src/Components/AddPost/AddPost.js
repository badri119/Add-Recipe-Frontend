import React, { useState } from "react";
import "./AddPost.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

const AddPost = ({ close, addRecipe }) => {
  const [formData, setFormData] = useState({
    recipename: "",
    type: "",
    ingredients: "",
    preparations: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // if name is ingredient and preparations, then
    // value = beef, liver, chicken is currently in string, if there's a comma, that's an array element.
    // console.log(name, value);
    setFormData((prevFormData) => {
      // console.log(prevFormData);
      // console.log(name, value);
      return { ...prevFormData, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Name: ${formData.recipename}, Type: ${formData.type}, Message: ${formData.ingredients}, Preps: ${formData.preparations}`
    );
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
            ></input>
            <div className="title_options">
              <label className="type" for="type">
                Type
              </label>
              <div class="select-dropdown">
                <select
                  className="select-dropdown-options"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="hide">Options</option>
                  <option value="Entree">Entree</option>
                  <option value="Mains">Mains</option>
                  <option value="Desserts">Dessert</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
            </div>
            <label for="ingredients"></label>
            <textarea
              className="ingrdientsinputclass"
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              placeholder="Enter the ingredients Requried"
              onChange={handleChange}
            ></textarea>
            <label for="preparations"></label>
            <textarea
              className="ingrdientsinputclass"
              type="text"
              id="preparations"
              name="preparations"
              value={formData.preparations}
              onChange={handleChange}
              placeholder="Type your preparation steps here.."
            ></textarea>
            <div className="buttonmain">
              <button
                className="postbutton"
                type="submit"
                onClick={() => {
                  addRecipe(formData);
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
