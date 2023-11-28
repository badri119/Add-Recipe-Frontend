import React from "react";
import "./AddPost.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

const AddPost = ({ close }) => {
  return (
    <div>
      <div className="maincontainer">
        <div className="postcontainer">
          <div className="closearrow">
            <AiFillCloseCircle size={33} onClick={close}></AiFillCloseCircle>
          </div>
          <form className="">
            <input
              className="inputclass"
              type="text"
              id="rname"
              name="recipename"
              placeholder="Recipe's Name.."
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
                >
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
              placeholder="Enter the ingredients Requried"
            ></textarea>
            <label for="preparations"></label>
            <textarea
              className="ingrdientsinputclass"
              type="text"
              id="preparations"
              name="preparations"
              placeholder="Type your preparation steps here.."
            ></textarea>
            <div className="buttonmain">
              <button className="postbutton" type="submit">
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
