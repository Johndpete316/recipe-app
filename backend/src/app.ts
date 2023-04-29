// app.ts
// planned features - add amazon s3 support for uploading images

import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import Recipe from './models/recipe';
import { connectToDatabase, createRecipe, getRecipeById, getRecipes } from './database.service.ts';

config();


// TODO: ASAP: FIX TOKEN EXPIRY AND IMPLMENT REFRESH TOKENS
const app: Application = express();
const checkJwt = auth({
    audience: 'https://recipeapi.drillchan.net', 
    issuerBaseURL: `https://dev-11vr6wc3.auth0.com/`,
})
app.use(checkJwt)
app.use(express.json())
const checkScopes = requiredScopes('write:data');

connectToDatabase();

// Endpoint to get all recipes
app.get('/recipes', asyncHandler(async (req: Request, res: Response) => {

    // Get the recipe from the database
    const recipe = await getRecipes()

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {
        res.status(200).json(recipe);
    }
}));

// Endpoint to get a recipe by ID
app.get('/recipes/:id', asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;

    // Get the recipe from the database
    const recipe = await getRecipeById(recipeId);

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {
        res.status(200).json(recipe);
    }
}));

// endpoint to get a user's saved recipes

// Endpoint to create a new recipe
app.post('/recipes', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;

    // Create the recipe in the database
    const result = await createRecipe(recipeData);

    if (result === null) {
        res.status(500).json({ error: 'Error creating recipe' });
    } else {
        res.status(201).json(result);
    }
}));

// Endpoint to update a recipe

// endpoint to create a new user

// endpoint to update a user

// endpoint to upload an image to s3 bucket

// endpoint to get an image from s3 bucket


const PORT = process.env.port || 3000;
app.listen(PORT, () => [
    console.log(`Server is listening on port ${PORT}`)
])



