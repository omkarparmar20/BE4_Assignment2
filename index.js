const {initializeDatabase} = require("./db/db.connect");
const Recipe = require("./models/recipes.model");
const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors());
app.use(express.json());
initializeDatabase();

async function createRecipe(newRecipe) {
    try{
        const recipe = new Recipe(newRecipe)
        const saveRecipe = await recipe.save()
        return saveRecipe;
    }catch(error){
        throw error;    
    }
}

app.post("/recipes", async (req,res) => {
    try{
        const savedRecipe = await createRecipe(req.body);
        res.status(201).json({message: "Recipe added successfully.", recipe: savedRecipe});
    }catch(error){
        res.status(500).json({error: "Failed to add recipe."})
    }
})

async function readAllRecipes() {
    try{
        const allRecipes = await Recipe.find()
        return allRecipes
    }catch(error){
        throw error;
    }
}

app.get("/recipes", async(req,res) => {
    try{
        const recipes = await readAllRecipes()
        if(recipes.length !== 0){
            res.json(recipes)
        }else{
            res.status(204).json("No recipe found.")
        }
    }catch(error){
        res.status(500).json({error: "Failed to find recipe."})
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on this", PORT);
})