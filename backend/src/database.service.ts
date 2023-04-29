import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

import Recipe from './models/recipe';
import User from './models/user';

export const collections: { recipes?: mongoDB.Collection, users?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const conn_string = process.env.DB_CONN_STRING
    const recipes_col_name = process.env.RECIPES_COLLECTION_NAME
    const users_coll_name = process.env.USERS_COLLECTION_NAME

    if(!conn_string) return
    if(!recipes_col_name) return
    if(!users_coll_name) return
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        conn_string
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const recipesCollection: mongoDB.Collection = db.collection(
        recipes_col_name
    );

    const usersCollection: mongoDB.Collection = db.collection(
        users_coll_name
    );

    collections.recipes = recipesCollection;
}

// recipe CRUD operations
export async function createRecipe(recipe: Recipe): Promise<boolean | null> {
    if (!collections!.recipes) return null;
    
    try {
        const result = await collections.recipes.insertOne(recipe);
        return result.acknowledged;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
    if (!collections!.recipes) return null;

    try {
        const result = await collections.recipes.findOne({
            _id: new mongoDB.ObjectId(id),
        });
        return result as Recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecipes(): Promise<Recipe[] | null> {
    if (!collections!.recipes) return null;

    try {
        const cursor = await collections.recipes.find();
        const results = await cursor.toArray();
        return results as Recipe[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function updateRecipe(id: string, updates: Partial<Recipe> ): Promise<Recipe | null> {
    if (!collections!.recipes) return null;

    try {
        const result = await collections.recipes.findOneAndUpdate(
            {
                _id: new mongoDB.ObjectId(id),
            },
            { $set: updates },
        );
        return result.value as Recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteRecipe(id: string): Promise<boolean | null> {
    if (!collections!.recipes) return null;

    try {
        const result = await collections.recipes.deleteOne({
            _id: new mongoDB.ObjectId(id),
        });
        return result.deletedCount === 1;
    } catch (error) {
        console.error(error);
        return false;
    }
}



// user CRUD operations

export async function createUser(user: User) {
    if (!collections!.users) return null;

    try {
        const result = await collections.users.insertOne(user);
        return result.acknowledged;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserById(id: string): Promise<User | null> {
    if (!collections!.users) return null;

    try {
        const result = await collections.users.findOne({
            _id: new mongoDB.ObjectId(id),
        });
        return result as unknown as User;
    } catch (error) {
        console.error(error);
        return null;
    }   
}

export async function getUserByEmail(email: string): Promise<User | null> {
    if (!collections!.users) return null;

    try {
        const result = await collections.users.findOne({
            email: email,
        });
        return result as unknown as User;
    } catch (error) {
        console.error(error);
        return null;
    }   
}    

export async function getUsers(): Promise<User[] | null> {
    if (!collections!.users) return null;

    try {
        const cursor = await collections.users.find();
        const results = await cursor.toArray();
        return results as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function updateUser(id: string, updates: Partial<User> ): Promise<User | null> {
    if (!collections!.users) return null;

    try {
        const result = await collections.users.findOneAndUpdate(
            {
                _id: new mongoDB.ObjectId(id),
            },
            { $set: updates },
        );
        return result.value as unknown as User;
    } catch (error) {
        console.error(error);
        return null;
    }    
}
