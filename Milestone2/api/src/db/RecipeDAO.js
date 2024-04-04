const db = require('./DBConnection');
const Recipe = require('./models/Recipe');

function getRecipes() {
  return db.query('SELECT * FROM recipes').then(({ results }) => {
    return results.map(recipe => new Recipe(recipe));;
  });
}

function getRecipeById(recipeId) {
  return db.query('SELECT * FROM recipes WHERE rec_id = ?', [recipeId]).then(({ results }) => {
    return results.map(recipe => new Recipe(recipe));;
  });
}

function getRecipesByUserId(userId) {
  return db.query('SELECT * FROM recipes WHERE user_id = ?', [userId]).then(({ results }) => {
    return results.map(recipe => new Recipe(recipe));;
  });
}

function createRecipe(recipe) {
  return db.query('INSERT INTO recipes (user_id, name, fat, protein, carbs, calories) VALUES (?, ?, ?, ?, ?, ?)',
    [recipe.user_id, recipe.name, recipe.fat, recipe.carbs, recipe.protein, recipe.calories]).then(({ results }) => {
      getRecipeB(results.insertId);
    });
}

// TODO: function updateRecipe(recipe)

module.exports = {
  getRecipes: getRecipes,
  getRecipeById: getRecipeById,
  createRecipe: createRecipe,
  getRecipesByUserId: getRecipesByUserId
};
