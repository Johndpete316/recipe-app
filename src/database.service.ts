import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

import Recipe from './models/recipe';

export const collections: { recipes?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const conn_string = process.env.DB_CONN_STRING
    const col_name = process.env.RECIPES_COLLECTION_NAME

    if(!conn_string) return
    if(!col_name) return

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        conn_string
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const recipesCollection: mongoDB.Collection = db.collection(
        col_name
    );

    collections.recipes = recipesCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${recipesCollection.collectionName}`
    );
}

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
