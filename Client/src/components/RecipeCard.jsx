import RecipeImg from "../assets/FoodIcon.png";
import ProfilePicture from "../assets/Profile.png";
import { Link } from "react-router-dom";

import {
  FaRegHeart,
  FaRegBookmark,
  FaShare,
  FaHeart,
  // FaFileExcel,
} from "react-icons/fa";

const RecipeCard = (props) => {
  const {
    id,
    userName,
    userImage,
    recipeImage,
    title,
    tags,
    showUser,
    recipe,
  } = props;

  // Define a function to restrict the text to a certain number of words
  const restrictText = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + "...";
    }
    return text;
  };

  return (
    <div
      className="card my-2 border-0 rounded rounded-0"
      style={{ backgroundColor: "#00425A", color: "#F1F1F1", height: "400px" }}
    >
      <div className="card text-bg-dark border border-0">
        <Link
          to={`/RecipeDetail/${id}`}
          className="text-decoration-none"
          style={{ position: "relative", display: "block" }}
        >
          <img
            src={recipeImage || RecipeImg}
            className="card-img rounded rounded-0"
            style={{ height: "200px" }}
            alt={title}
          />
          <div
            className="m-2"
            style={{ position: "absolute", top: "0", right: "0" }}
          >
            {tags.map((tag, index) => (
              <span
                className="badge rounded-pill mx-1"
                style={{ backgroundColor: "#FC7300" }}
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="m-2"
            style={{ position: "absolute", bottom: "0", right: "0" }}
          >
            <span
              className="position-absolute bottom-0 end-0 badge"
              style={{
                backgroundColor: "rgba(0, 66, 90, 0.7)",
                color: "#FFFFFF",
              }}
            >
              128k <FaHeart />
            </span>
          </div>
        </Link>
      </div>
      <div className="card-body">
        <Link to={`/RecipeDetail/${id}`} className="text-decoration-none">
          <h4 className="card-title fw-bold" style={{ color: "#FC7300" }}>
            {title}
          </h4>
        </Link>
        <p className="card-text">{restrictText(recipe, 10)}</p>
      </div>
      <div className="card-footer border-0">
        {showUser && (
          <div className="d-flex justify-content-between">
            <Link
              to={`/${userName}`}
              className="text-decoration-none text-white"
            >
              <div className="d-flex justify-content-start align-items-center">
                <img
                  src={userImage || ProfilePicture}
                  alt="Profile"
                  width="25"
                  height="25"
                  className="rounded-circle"
                />
                <h6 className="ms-2 m-0 align-self-end">{userName}</h6>
              </div>
            </Link>
            <div className="d-flex align-items-center">
              <FaRegHeart className="me-1" />
              <FaRegBookmark className="me-1" />
              <FaShare className="me-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
