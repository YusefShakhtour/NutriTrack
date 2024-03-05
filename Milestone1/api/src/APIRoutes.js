const router = require('express').Router();

const { users, recipes } = require('./data');

// Default
router.get('/', (req, res) => {
  res.json({ your_api: 'it works' });
});

// Create user
router.post('/users', (req, res) => {
});

// Update a user
router.put('/users/:userId', (req, res) => {
});

// Get all users
router.get('/users', (req, res) => {
  res.json(Object.values(users));
});

// Get a specific user
router.get('/users/:userId', (req, res) => {
  const user = users[req.params.userId];
  if (user) {
    res.json(user);
  }
  else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user
router.delete('/users/:userId', (req, res) => {
});

// Create recipe
router.post('/recipes', (req, res) => {
});

// Update a recipe
router.put('/recipes/:recipeId', (req, res) => {
});

// Get all recipes
router.get('/recipes', (req, res) => {
  res.json(Object.values(recipes));
});

// Get a specific recipe
router.get('/recipes/:recipeId', (req, res) => {
  const recipe = recipes[req.params.recipeId];
  if (recipe) {
    res.json(recipe);
  }
  else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

// Delete a recipe
router.delete('/recipes/:recipeId', (req, res) => {
});

// Get all recipes for a user
router.get('/users/:userId/recipes', (req, res) => {
  const userId = parseInt(req.params.userId);

  // Verify that the user exists
  const user = users[userId];
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  const results = Object.values(recipes).filter(recipe => recipe.userId === userId);
  res.json(results);
});

module.exports = router;