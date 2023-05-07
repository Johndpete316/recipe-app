// app.ts
import { config } from 'dotenv';
import path from 'path';

import express, { Application, Request, Response } from 'express';
import multer from 'multer';
import asyncHandler from 'express-async-handler';

// auth
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

// database service
import {
    connectToDatabase,
    createRecipe,
    getRecipeById,
    getRecipes,
    updateRecipe,
    createUser,
    updateUser,
    getUserById,
    getUserByEmail
} from './database.service.ts';

//s3 service
import { uploadFIleToS3 } from './s3.service.ts';

// redis
import ExpressRedisCache from 'express-redis-cache'

// models
import User from './models/user';
import Recipe from './models/recipe';


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
    cache.del('/api/recipes', (err) => {
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

// image upload
const upload = multer({ storage: multer.memoryStorage() });


connectToDatabase();

// route to get all recipes
// route cached
app.get('/api/recipes', cache.route(), asyncHandler(async (req: Request, res: Response) => {

    interface RecipeResponse {
        recipes: Recipe[],
        message: string,
        count: number
    }

    // Get the recipe from the database
    const recipe = await getRecipes()

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {

        var response: RecipeResponse = {
            recipes: recipe,
            message: 'success',
            count: recipe.length
        }
        res.status(200).json(response);
    }
}));

// route to get a recipe by ID
// route cached
app.get('/api/recipes/:id', cache.route(), asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;

    // Get the recipe from the database
    const recipe = await getRecipeById(recipeId);

    if (recipe === null) {
        res.status(404).json({ error: 'Recipe not found' });
    } else {
        res.status(200).json(recipe);
    }
}));

// TODO: route to get a user's saved recipes from users col

// route to create a new recipe
app.post('/api/create/recipe', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const recipeData: Recipe = req.body;

    // Create the recipe in the database
    const result = await createRecipe(recipeData);

    if (result === null) {
        res.status(500).json({ error: 'Error creating recipe' });
    } else {

        // clear the cache
        clearRedisCache('/api/recipes')

        // return the result
        res.status(201).json(result);
    }
}));

// route to update a recipe
app.post('/api/update/recipes/:id', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;
    const recipeData: Recipe = req.body;

    // update the recipe in the database
    const result = await updateRecipe(recipeId, recipeData);


    if (result === null) {
        res.status(500).json({ error: 'Error updating recipe' });
    } else {

        clearRedisCache('/api/recipes')
        clearRedisCache(`/recipes/${recipeId}`)

        res.status(201).json(result);
    }
}));

// route to create a new user
app.post('/api/create/user', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const userData: User = req.body;

    // Create the user in the database
    const result = await createUser(userData);

    if (result === null) {
        res.status(500).json({ error: 'Error creating user' });
    } else {

        clearRedisCache('/api/recipes')
        clearRedisCache(`/recipes/${userData.id}`)

        res.status(201).json(result);
    }
}));

// route to update a user
app.post('/api/update/user/:id', checkScopes, asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData: User = req.body;

    // update the user in the database
    const result = await updateUser(userId, userData);

    if(result === null) {
        res.status(500).json({ error: 'Error updating user' });
    } else {
            
            clearRedisCache('/api/recipes')
            clearRedisCache(`/recipes/${userId}`)
    
            res.status(201).json(result);
    }
}));

// route to get a user by id
// route cached
app.get('/api/user/:id', cache.route(), asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    // Get the user from the database
    const user = await getUserById(userId);
    console.log('user: ', user)

    if (user === null) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(user);
    }
}));


// route to upload an image to s3 bucket


// route to get an image from s3 bucket


// TEST ROUTES

// test routes to serve a placeholder image
app.get('/api/placeholder', express.static('public'), asyncHandler(async (req: Request, res: Response) => {

    // load image from ./public/images/placeholder.webp
    const imagePath = path.resolve('public', 'images', 'placeholder.webp');
    res.sendFile(imagePath);
}));

// Test route to get a user by id without cache middleware
app.get('/api/user/test/:id', asyncHandler(async (req: Request, res: Response) => {
    console.log("API /api/user/test/:id called");
    const userId = req.params.id;

    // Get the user from the database
    const user = await getUserByEmail("johndpete5316@outlook.com");

    if (user === null) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(user);
    }
}));

// test route to upload an image to s3 bucket
app.post('/api/test/upload/image', checkScopes, upload.single('image'), asyncHandler(async (req: Request, res: Response) => {

    let bucket_path = 'test';

    if(!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    try {
        const key = `${req.file.originalname}`;
        const result = await uploadFIleToS3(req.file, key, bucket_path); // last param is the path inside the bucket
        res.status(201).json( { 
            imageUrl_thumbnail: result.thumbnail,
            imageUrl_small: result.small,
            imageUrl_medium: result.medium,
            imageUrl_large: result.large
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading image' });
    }
}));


const PORT = process.env.port || 3000;
app.listen(PORT, () => [
    console.log(`Server is listening on port ${PORT}`)
])




