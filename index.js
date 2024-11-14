const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipes.model");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
initializeDatabase();

// Helper function to create a new recipe
async function createRecipe(newRecipe) {
    try {
        const recipe = new Recipe(newRecipe);
        const savedRecipe = await recipe.save();
        return savedRecipe;
    } catch (error) {
        throw error;    
    }
}

// POST route to create a new recipe
app.post("/recipes", async (req, res) => {
    try {
        const savedRecipe = await createRecipe(req.body);
        res.status(201).json({ message: "Recipe added successfully.", recipe: savedRecipe });
    } catch (error) {
        res.status(500).json({ error: "Failed to add recipe." });
    }
});

// Helper function to read all recipes
async function readAllRecipes() {
    try {
        const allRecipes = await Recipe.find();
        return allRecipes;
    } catch (error) {
        throw error;
    }
}

// GET route to retrieve all recipes
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await readAllRecipes();
        if (recipes.length !== 0) {
            res.json(recipes);
        } else {
            res.status(200).json([]);  // Returning empty array with a 200 status code
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to find recipe." });
    }
});

// Error handling middleware for unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
