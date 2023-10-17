import mongoose from "mongoose";
import Recipe from "../models/recipes.js";
import recipes from "../models/recipes.js";

// -----------------------------------------------------------------------------------------------
// @desc - get all Recipes
// @route - GET /api/recipes/explore
// -----------------------------------------------------------------------------------------------
export const getAllRecipes = async (req, res) => {
  try {
    const recipeCount = await Recipe.countDocuments(); // Get the total count of recipes
    const sampleSize = recipeCount; // Use the count as the sample size

    const recipes = await Recipe.aggregate([
      { $sample: { size: sampleSize } }, // Retrieve all recipes in a random order
    ]);

    return res
      .status(200)
      .json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - get login users Recipes
// @route - GET /api/recipes/profile
// -----------------------------------------------------------------------------------------------
export const getUsersRecipes = async (req, res) => {
  try {
    const user_id = req.user._id;
    const recipes = await Recipe.find({ user_id });
    return res.status(200).json({
      success: true,
      count: recipes.length,
      user_id: user_id,
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - get single Recipes
// @route - GET /api/recipes
// -----------------------------------------------------------------------------------------------
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, error: "Product Not Found" });
    }

    const recipe = await Recipe.findById(id);

    // Check for existence of recipe
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Product Not Found" });
    }

    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - add Recipes
// @route - POST /api/recipes
// -----------------------------------------------------------------------------------------------
export const addRecipes = async (req, res) => {
  try {
    const user_id = req.user._id;
    const recipeData = {
      ...req.body,
      user_id,
    };

    const recipe = await Recipe.create(recipeData);
    return res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};
