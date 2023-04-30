// app.ts
// planned features - add amazon s3 support for uploading images

import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import Recipe from './models/recipe';
import { 
        connectToDatabase, 
        createRecipe, 
        getRecipeById, 
        getRecipes, 
        updateRecipe,
        createUser,
        updateUser
     } from './database.service.ts';
import ExpressRedisCache from 'express-redis-cache'

config();

// init redis client

// connect to redis on 10.16.10.122:6379
const cache = ExpressRedisCache({
    host: process.env.REDIS_HOST,
    port: 6379,
    expire: 120,
})

// clear redis cache
function clearRedisCache(route: string) {
    cache.del('/recipes', (err) => {
        if (err) {
            console.error(`Error deleting cache on route ${route}: ${err}`)
        }
    });
}


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
app.get('/recipes', cache.route(), asyncHandler(async (req: Request, res: Response) => {

    // Get the recipe from the database
    const recipe = await getRecipes()

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {
        res.status(200).json(recipe);
    }
}));

// Endpoint to get a recipe by ID
app.get('/recipes/:id', cache.route(), asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;

    // Get the recipe from the database
    const recipe = await getRecipeById(recipeId);

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {
        res.status(200).json(recipe);
    }
}));

// TODO: endpoint to get a user's saved recipes from users col

// Endpoint to create a new recipe
app.post('/recipes', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;

    // Create the recipe in the database
    const result = await createRecipe(recipeData);

    if (result === null) {
        res.status(500).json({ error: 'Error creating recipe' });
    } else {

        // clear the cache
        clearRedisCache('/recipes')

        // return the result
        res.status(201).json(result);
    }
}));

// Endpoint to update a recipe
app.post('/recipes/:id', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;
    const recipeData: Recipe = req.body;

    // update the recipe in the database
    const result = await updateRecipe(recipeId, recipeData);
    

    if (result === null) {
        res.status(500).json({ error: 'Error updating recipe' });
    } else {

        clearRedisCache('/recipes')
        clearRedisCache(`/recipes/${recipeId}`)

        res.status(201).json(result);
    }
}));

// endpoint to create a new user
app.post('/users', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;

    // Create the user in the database
    const result = await createUser(userData);

    if (result === null) {
        res.status(500).json({ error: 'Error creating user' });
    } else {
        res.status(201).json(result);
    }
}));

// endpoint to update a user
app.post('/users/:id', checkScopes, asyncHandler(async (req: Request, res: Response) => {
        
}));

// endpoint to upload an image to s3 bucket

// endpoint to get an image from s3 bucket


const PORT = process.env.port || 3000;
app.listen(PORT, () => [
    console.log(`Server is listening on port ${PORT}`)
])




