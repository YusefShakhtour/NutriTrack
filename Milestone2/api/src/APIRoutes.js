const router = require('express').Router();
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const { users, recipes } = require('./data');

router.use(cookieParser());

const {TokenMiddleware, generateToken, removeToken} = require('../../middleware/TokenMiddleware');


// Default
router.get('/', (req, res) => {
  res.json({ your_api: 'it works' });
});

// Login
router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    console.log("Login attempt with username: " + req.body.username + " and password: " + req.body.password)
    getUserByCredentials(req.body.username, req.body.password)
      .then(user => {
        console.log("User logged in successfully:", user);
        let result ={
          id: user.id,
          username: user.username,
          email: user.email,
          recipe: user.recipe
        }
        generateToken(req, res, user);
        res.json(result);
      })
      .catch(error => {
        res.status(error.code).json({ error: error.message });
      });
  }
}); 
   
   

  
function getUserByCredentials(username, password) {
  console.log("Looking for user: ", username );
  return new Promise((resolve, reject) => {
    const user = Object.values(users).find(user => user.username == username);
    console.log("User found: ", user ? user.username : "none");
    if (user) { // we found our user
      crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) { //problem computing digest, like hash function not available
          reject({code: 400, message: "Error: " +err});
        }

        const digest = derivedKey.toString('hex');
        if (user.password == digest) {
          resolve(getFilteredUser(user));
        }
        else {
          reject({code: 401, message: "Invalid username or password"});
        }
      });
    }
    else { // if no user with provided username
      reject({code: 401, message: "No such user"});
    }
  });

} 

function getFilteredUser(user) {
  return {
    "id": user.id,
    "username": user.username,
    "email": user.email,
    "recipe": user.recipe
  }
}



// Create user
router.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    id: Object.keys(users).length + 1,
    name,
    email,
    password,
    recipes: []
  };
  users[user.id] = user;
  res.json(user);
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