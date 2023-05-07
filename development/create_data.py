import random
import requests
from typing import List
import json
import sample_data
import config
from typing import List
from datetime import datetime


# Replace this with your token
TOKEN = config.TOKEN


# List of ingredients
ingredients_list = sample_data.ingredients_list

def generate_random_ingredients(ingredients: List[str], num: int = 4) -> List[str]:
    return random.sample(ingredients, num)

def get_recipe(ingredients: List[str]) -> dict:
    url = config.url
    headers = {"Content-Type": "application/json"}
    data = json.dumps([", ".join(ingredients)])
    response = requests.post(url, headers=headers, data=data)
    return response.json()

def add_recipe_to_database(recipes: List[dict]) -> List[dict]:
    url = "http://localhost:3000/api/create/recipe"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}"
    }
    responses = []

    for recipe in recipes:
        # Add additional fields to the recipe data
        recipe["author"] = "644b573ceabb6009c985fb9f"  # Replace with the author ObjectId
        recipe["isPublic"] = True
        recipe["generatedByNLP"] = True
        recipe["createdAt"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
        recipe["updatedAt"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"

        data = json.dumps(recipe)
        response = requests.post(url, headers=headers, data=data)

        # Check if the response has any content before attempting to parse as JSON
        if response.content:
            try:
                responses.append(response.json())
            except json.decoder.JSONDecodeError:
                print(f"Failed to add recipe: {recipe['title']}")
                print(f"Response status code: {response.status_code}")
                print(f"Response content: {response.content}")
                responses.append({"error": "Error creating recipe"})
        else:
            print(f"Failed to add recipe: {recipe['title']}")
            print(f"Response status code: {response.status_code}")
            responses.append({"error": "Error creating recipe"})

    return responses


def main():
    random_ingredients = generate_random_ingredients(ingredients_list)
    print(f"Random Ingredients: {random_ingredients}")

    recipe = get_recipe(random_ingredients)
    print(f"Generated Recipe: {recipe}")

    added_recipe = add_recipe_to_database(recipe)
    print(f"Added Recipe: {added_recipe}")

if __name__ == "__main__":

    # Run the main function 10 times
    for i in range(500):
        main()
                