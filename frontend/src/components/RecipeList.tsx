import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import Recipe from "../models/recipe";
import SeparatorLine from './SeparatorLine';


import '../styles/RecipeCard.css'

interface RecieptListProps {
    token: string;
}

const RecipeList: React.FC<RecieptListProps> = ({ token }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get<Recipe[]>("/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
  
    fetchRecipes();
  }, [token]);

  return (
    <div className="card-container">
      {recipes.map((recipe, index) => (
        <>
          <RecipeCard key={recipe._id} recipe={recipe} token={token} />
          {index < recipes.length - 1 && <SeparatorLine />}
        </>
      ))}
    </div>
  );
};

export default RecipeList;
